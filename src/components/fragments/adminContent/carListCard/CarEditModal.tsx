import React from "react";
import { FC, useEffect } from "react";
import { CarProps } from "./carTypes";
import { Controller, useForm } from "react-hook-form";

interface CarEditModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  updateCar: CarProps;
  onSave: (data: CarProps) => void;
}

const CarEditModal: FC<CarEditModalProps> = ({
  showEditModal,
  setShowEditModal,
  updateCar,
  onSave,
}) => {
  const { control, handleSubmit, reset } = useForm<CarProps>({
    defaultValues: updateCar,
  });

  useEffect(() => {
    if (showEditModal) {
      reset(updateCar);
    }
  }, [showEditModal, updateCar, reset]);

  const submitForm = (data: CarProps) => {
    onSave(data);
    setShowEditModal(false);
  };

  if (!showEditModal) return null;

  return (
    <div
      className="modal d-flex justify-content-center align-items-center"
      id="carEditModal"
    >
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
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      {...field}
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
                    />
                  </div>
                </div>
              )}
            />
            <Controller
            name="rentPerDay"
            control={control}
            render={({field}) => (
              <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="rentPerDay" className="form-label">
                  Rent per Day
                </label>
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  id="rentPerDay"
                  {...field}
                />
              </div>
            </div>
            )}
            />
            <Controller 
            name="image"
            control={control}
            render={({field}) => (
              <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  {...field}
                />
              </div>
            </div>
            )}
            />
            <div className="d-flex justify-content-center">
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="confirmEditBtn btn btn-dark-blue text-light"
                  >
                    Submit
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="cancelEditBtn btn btn-light btn-outline-primary fw-bold"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
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
