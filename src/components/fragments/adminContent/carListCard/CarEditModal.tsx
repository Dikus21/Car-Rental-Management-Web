import React, { useCallback, useState } from 'react';
import { FC, useEffect } from 'react';
import { CarProps } from './carTypes';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

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
  const { control, handleSubmit, reset } = useForm<CarProps>({
    defaultValues: updateCar
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(updateCar.imageUrl);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile) {
      setFile(acceptedFile);
      setPreview(URL.createObjectURL(acceptedFile));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (showEditModal) {
      reset(updateCar);
    }
  }, [showEditModal, updateCar, reset]);

  const submitForm = (data: CarProps) => {
    const formData = new FormData();
    formData.append('model', data.model);
    formData.append('type', data.type);
    formData.append('year', data.year);
    formData.append('price', data.price.toString());
    if (file) {
      formData.append('image', file);
    }
    onSave(data.id, formData);
    setShowEditModal(false);
  };

  if (!showEditModal) return null;

  return (
    <div className="modal d-flex justify-content-center align-items-center" id="carEditModal">
      <div className="modal-content-edit">
        <div className="container mt-5">
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="model" className="form-label">
                      Model
                    </label>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" id="model" {...field} />
                  </div>
                </div>
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" id="type" {...field} />
                  </div>
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="price" className="form-label">
                      Rent per Day
                    </label>
                  </div>
                  <div className="col">
                    <input type="number" className="form-control" id="price" {...field} />
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
                        className: 'text-center border border-1 border-black rounded-3 p-3'
                      })}>
                      <input
                        {...getInputProps({
                          onBlur: onBlur || (() => {}), // Default to a no-op function if null
                          ref: ref || undefined, // Use undefined for uncontrolled components
                          name: name || '', // Default to an empty string if null
                          onChange: onChange || (() => {}) // Default to a no-op function if null
                        })}
                      />
                      <img
                        src={preview}
                        alt="preview"
                        width={400}
                        height={300}
                        onLoad={() => preview && URL.revokeObjectURL(preview || '')}
                      />
                    </div>
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
