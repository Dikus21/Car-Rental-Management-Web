import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarProps } from "./carListCard/carTypes";
import { Controller, useForm } from "react-hook-form";

export default function CarAdd () {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarProps>({
    defaultValues: {
      model: "",
      rentPerDay: 0,
      type: "",
      image: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(data: CarProps) {
    console.log(data);
    fetch("http://localhost:8000/cars/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset();
      console.log("add car successfully");
      navigate("/admin/cars", {
        state: {
          notificationMessage: "Car added successfully!",
          notificationColor: "green",
        },
      });
    });
  }

  return (
    <div className="ms-2">
      <p className="mt-4 d-flex align-items-center gap-1">
        <b>Cars</b>
        <i
          data-feather="chevron-right"
          className="mt-1"
          style={{ width: "20px", height: "20px" }}
        />
        <b>List Car</b>
        <i
          data-feather="chevron-right"
          className="mt-1"
          style={{ width: "20px", height: "20px" }}
        />
        Add New Car
      </p>
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
            name="rentPerDay"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="rentPerDay" className="form-label">
                    Price
                  </label>
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="rentPerDay"
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
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    {...field}
                    placeholder="Image URL"
                  />
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
              className="btn btn-light border-dark-blue text-dark-blue fw-bold rounded-1"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-dark-blue text-white fw-bold rounded-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

