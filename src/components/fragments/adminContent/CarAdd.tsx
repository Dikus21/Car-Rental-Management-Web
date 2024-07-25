import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarAddDto, CarFormProps } from './carListCard/carTypes';
import { Controller, useForm } from 'react-hook-form';
import { FileRejection, useDropzone } from 'react-dropzone';
import { addCar } from '../../../services/car/car.services';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleKeyNumberOnly } from '../../../utils/function';

export default function CarAdd() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<CarFormProps>({
    resolver: yupResolver(CarAddDto),
    defaultValues: {
      model: '',
      manufacture: '',
      year: '',
      rentPerDay: '',
      capacity: '',
      transmission: '',
      withDriver: '',
      description: ''
    }
  });
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      console.log(acceptedFiles);
      const acceptedFile = acceptedFiles[0];
      console.log(acceptedFile);
      const rejectedFile = rejectedFiles[0];
      let rejectedMessage: string;
      console.log(rejectedFile);
      if (rejectedFile) {
        if (rejectedFile.errors[0].code === 'file-too-large') {
          rejectedMessage = 'File too Large, Max file size is 1.5MB';
        } else if (rejectedFile.errors[0].code === 'file-invalid-type') {
          rejectedMessage = 'Only images are allowed';
        } else {
          rejectedMessage = 'File rejected for unknown reason';
        }
        setPreview('');
        setFile(null);
        setError('image', { message: rejectedMessage });
      } else {
        setFile(acceptedFile);
        setPreview(URL.createObjectURL(acceptedFile));
        clearErrors('image');
      }
    },
    [clearErrors, setError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    maxSize: 1.5 * 1024 * 1024
  });

  const onSubmit = async (data: CarFormProps) => {
    console.log('data', data);
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    } else {
      setError('image', { message: 'Image is required' });
      return;
    }
    formData.append('model', data.model);
    formData.append('manufacture', data.manufacture);
    formData.append('year', data.year);
    formData.append('rentPerDay', data.rentPerDay);
    formData.append('capacity', data.capacity);
    formData.append('transmission', data.transmission);
    formData.append('withDriver', data.withDriver);
    formData.append('description', data.description ?? '');

    console.log('formData', {
      model: data.model,
      manufacture: data.manufacture,
      year: data.year,
      rentPerDay: data.rentPerDay,
      capacity: data.capacity,
      transmission: data.transmission,
      withDriver: data.withDriver,
      description: data.description ?? ''
    });

    addCar(formData).then((response) => {
      if (response && response.success) {
        reset();
        navigate('/admin/cars', {
          state: { notificationMessage: response.message, notificationColor: 'green' }
        });
      }
    });
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <input
                    type="text"
                    className={`form-control ${errors.model && 'border-danger'}`}
                    id="model"
                    {...field}
                    placeholder="Car Model"
                  />
                  {errors.model && <span className="text-danger">{errors.model.message}</span>}
                </div>
              </div>
            )}
          />
          <Controller
            name="manufacture"
            control={control}
            render={({ field }) => (
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="manufacture" className="form-label">
                    Manufacture
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className={`form-control ${errors.manufacture && 'border-danger'}`}
                    id="manufacture"
                    {...field}
                    placeholder="Car Manufacture"
                  />
                  {errors.manufacture && (
                    <span className="text-danger">{errors.manufacture.message}</span>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="year" className="form-label">
                    Year
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className={`form-control ${errors.year && 'border-danger'}`}
                    id="year"
                    {...field}
                    placeholder="Year"
                    onKeyDown={(e) => {
                      handleKeyNumberOnly(e);
                      if (e.currentTarget.value.length > 3) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.year && <span className="text-danger">{errors.year.message}</span>}
                </div>
              </div>
            )}
          />
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
                  <input
                    type="text"
                    className={`form-control ${errors.capacity && 'border-danger'}`}
                    id="capacity"
                    {...field}
                    placeholder="Capacity"
                    min={0}
                    onKeyDown={handleKeyNumberOnly}
                  />
                  {errors.capacity && (
                    <span className="text-danger">{errors.capacity.message}</span>
                  )}
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
                  <select
                    className={`form-select ${errors.transmission && 'border-danger'}`}
                    id="transmission"
                    {...field}>
                    <option value="" hidden>
                      Select Transmission
                    </option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  {errors.transmission && (
                    <span className="text-danger">{errors.transmission.message}</span>
                  )}
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
                    Driver
                  </label>
                </div>
                <div className="col">
                  <select
                    className={`form-select ${errors.withDriver && 'border-danger'}`}
                    id="withDriver"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}>
                    <option value="" hidden>
                      Select Driver
                    </option>
                    <option value="true">Dengan Driver</option>
                    <option value="false">Tanpa Driver</option>
                  </select>
                  {errors.withDriver && (
                    <span className="text-danger">{errors.withDriver.message}</span>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="rentPerDay"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="rentPerDay" className="form-label">
                    Rent Per Day
                  </label>
                </div>
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${errors.rentPerDay && 'border-danger'}`}
                    id="rentPerDay"
                    {...field}
                    placeholder="Rent Per Day"
                    onKeyDown={handleKeyNumberOnly}
                  />
                  {errors.rentPerDay && (
                    <span className="text-danger">{errors.rentPerDay.message}</span>
                  )}
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
                  <textarea
                    className={`form-control ${errors.description && 'border-danger'}`}
                    id="description"
                    {...field}
                    placeholder="Description"
                  />
                  {errors.description && (
                    <span className="text-danger">{errors.description.message}</span>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
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
                    <input {...getInputProps()} {...field} />
                    {file ? (
                      <img
                        src={preview ? preview : '/assets/images/noImage.jpg'}
                        alt={file?.name}
                        width={400}
                        height={300}
                        onLoad={() => {
                          URL.revokeObjectURL(preview || '');
                          console.log(file);
                        }}
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
          <div className="row mb-3">
            <div className="col-3">
              <label htmlFor="startRent" className="form-label">
                Start Rent
              </label>
            </div>
            <div className="col">-</div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <label htmlFor="finishRent" className="form-label">
                Finish Rent
              </label>
            </div>
            <div className="col">-</div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <label htmlFor="createdDate" className="form-label">
                Created at
              </label>
            </div>
            <div className="col">-</div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <label htmlFor="updatedDate" className="form-label">
                Updated at
              </label>
            </div>
            <div className="col">-</div>
          </div>
          <div className="container-fluid d-flex gap-3">
            <Link
              to="/admin/cars"
              className="btn btn-light border-dark-blue text-dark-blue fw-bold rounded-1">
              Cancel
            </Link>
            <button type="submit" className="btn btn-dark-blue text-white fw-bold rounded-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
