import React, { useCallback, useState } from 'react';
import { FC, useEffect } from 'react';
import { CarProps } from './carTypes';
import { Controller, useForm } from 'react-hook-form';
import { FileRejection, useDropzone } from 'react-dropzone';

interface CarEditModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  updateCar: CarProps;
  onSave: (carId: number, data: FormData) => void;
}

const CarEditModal: FC<CarEditModalProps> = ({
  showEditModal,
  setShowEditModal,
  updateCar,
  onSave
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<CarProps>({
    defaultValues: updateCar
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(updateCar.imageUrl);
  const [startDate, setStartDate] = useState<string>();

  // doropzone image configuration
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const acceptedFile = acceptedFiles[0];
    const rejectedFile = rejectedFiles[0];
    let rejectedMessage: string;
    if (rejectedFile) {
      if (rejectedFile.errors[0].code === 'file-too-large') {
        rejectedMessage = 'File too Large, Max file size is 1.5MB';
      } else if (rejectedFile.errors[0].code === 'file-invalid-type') {
        rejectedMessage = 'Only images are allowed';
      } else {
        rejectedMessage = 'File rejected for unknown reason';
      }
      setError('image', { message: rejectedMessage });
    } else {
      setFile(acceptedFile);
      setPreview(URL.createObjectURL(acceptedFile));
      clearErrors('image');
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 1.5 * 1024 * 1024,
    accept: { 'image/*': [] }
  });

  useEffect(() => {
    if (showEditModal) {
      reset(updateCar);
    }
  }, [showEditModal, updateCar, reset]);

  const submitForm = (data: CarProps) => {
    const formData = new FormData();
    formData.append('capacity', data.capacity.toString());
    formData.append('transmission', data.transmission);
    formData.append('withDriver', data.withDriver.toString());
    formData.append('year', data.year);
    formData.append('rentPerDay', data.rentPerDay.toString());
    formData.append('description', data.description || '');
    formData.append('startRent', data.startRent || '');
    formData.append('endRent', data.endRent || '');
    if (file) {
      formData.append('image', file);
    }
    onSave(data.id, formData);
    setShowEditModal(false);
  };

  if (!showEditModal) return null;
  const today = new Date();

  const watchedStartRent = watch('startRent', startDate);

  const getNextDay = (date: string) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setShowEditModal(false);
    }
  };

  return (
    <div
      className="modal d-flex justify-content-center align-items-center"
      id="carEditModal"
      onClick={handleClickOutside}>
      <div className="modal-content-edit">
        <div className="container">
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="capacity" className="form-label">
                      Capacity
                    </label>
                  </div>
                  <div className="col">
                    <input type="number" className="form-control" id="capacity" {...field} />
                  </div>
                </div>
              )}
            />
            <Controller
              name="transmission"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="transmission" className="form-label">
                      Transmission
                    </label>
                  </div>
                  <div className="col">
                    <select className="form-select" id="transmission" {...field}>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>
              )}
            />
            <Controller
              name="withDriver"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="withDriver" className="form-label">
                      With Driver
                    </label>
                  </div>
                  <div className="col">
                    <select className="form-select" id="withDriver" {...field}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              )}
            />
            <Controller
              name="rentPerDay"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="rentPerDay" className="form-label">
                      Rent per Day
                    </label>
                  </div>
                  <div className="col">
                    <input type="number" className="form-control" id="rentPerDay" {...field} />
                  </div>
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col">
                    <textarea className="form-control" id="description" {...field} />
                  </div>
                </div>
              )}
            />
            <Controller
              name="startRent"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="startRent" className="form-label">
                      Start Rent
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      id="startRent"
                      min={today.toISOString().split('T')[0]}
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        field.onChange(e);
                        setStartDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            />
            <Controller
              name="endRent"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="endRent" className="form-label">
                      End Rent
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      id="endRent"
                      min={getNextDay(watchedStartRent || today.toISOString().split('T')[0])}
                      disabled={!watchedStartRent}
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                    />
                  </div>
                </div>
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field: { onBlur, ref, onChange, name } }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                  </div>
                  <div className="col">
                    <div
                      {...getRootProps({
                        className: `text-center border border-1 rounded-3 p-3 ${
                          errors.image ? 'border-danger' : 'border-black'
                        }`
                      })}>
                      <input
                        {...getInputProps({
                          onBlur: onBlur || (() => {}), // Default to a no-op function if null
                          ref: ref || undefined, // Use undefined for uncontrolled components
                          name: name || '', // Default to an empty string if null
                          onChange: onChange || (() => {}) // Default to a no-op function if null
                        })}
                      />
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          width={400}
                          height={300}
                          onLoad={() => preview && URL.revokeObjectURL(preview || '')}
                        />
                      ) : (
                        <p className={`fs-4 ${errors.image ? 'text-danger' : 'text-black'}`}>
                          Drag & drop files here, or click to select files
                        </p>
                      )}
                    </div>
                    {errors.image && <span className="text-danger">{errors.image.message}</span>}
                  </div>
                </div>
              )}
            />
            <div className="d-flex justify-content-center">
              <div className="row">
                <div className="col-6">
                  <button type="submit" className="confirmEditBtn btn btn-dark-blue text-light">
                    Submit
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="cancelEditBtn btn btn-light btn-outline-primary fw-bold"
                    type="button"
                    onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarEditModal;
