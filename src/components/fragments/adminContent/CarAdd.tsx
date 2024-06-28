import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarProps } from './carListCard/carTypes';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { addCar } from '../../../services/car/car.services';

export default function CarAdd() {
  const {
    control,
    handleSubmit,
    reset
    // formState: { errors }
  } = useForm<CarProps>({
    defaultValues: {
      model: '',
      price: 0,
      type: '',
      image: '',
      year: ''
    }
  });
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const acceptedFile = acceptedFiles[0];
    console.log(acceptedFile);
    if (acceptedFile) {
      setFile(acceptedFile);
      setPreview(URL.createObjectURL(acceptedFile));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop
  });

  function onSubmit(data: CarProps) {
    console.log(data);
    const formData = new FormData();
    formData.append('model', data.model);
    formData.append('type', data.type);
    formData.append('year', data.year);
    formData.append('price', data.price.toString());
    if (file) {
      formData.append('image', file);
    }

    addCar(formData).then(({ success, message }) => {
      if (success) {
        reset();
        navigate('/admin/cars', {
          state: { notificationMessage: message, notificationColor: 'green' }
        });
      }
    });
  }

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
                    className="form-control"
                    id="model"
                    {...field}
                    placeholder="Car Model"
                  />
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
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    {...field}
                    placeholder="Car Type"
                  />
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
                    className="form-control"
                    id="year"
                    {...field}
                    placeholder="Year"
                  />
                </div>
              </div>
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    {...field}
                    placeholder="Price"
                  />
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
                      className: 'text-center border border-1 border-black rounded-3 p-3'
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
                      <p className="fw-normal fs-4">
                        Drag & drop files here, or click to select files
                      </p>
                    )}
                  </div>
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
