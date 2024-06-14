import React, { useState } from "react";
import CarEditModal from "./CarEditModal";
import CarDeleteModal from "./CarDeleteModal";
import {format} from "date-fns";

export default function CarCard({car, setRefresh, setNotificationMessage, setNotificationColor}) {
  const [updateCar, setUpdateCar] = useState({
    ...car,
    updatedAt: new Date().toISOString()
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function formatDate(date) {
    return format(date, "d MMM yyyy, HH:mm");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateCar((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/cars/' + car.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCar),
    })
      .then(() => {
        console.log("Car updated");
        setNotificationMessage("Data Berhasil Diupdate");
        setNotificationColor("green");
        setShowEditModal(false);
        setRefresh(true);
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/cars/' + car.id, {
      method:"DELETE",
    }).then(() => {
      console.log('car deleted');
      setNotificationMessage("Data Berhasil Dihapus");
      setNotificationColor("black");
      setShowDeleteModal(false);
      setRefresh(true);
    })
    .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <div className="car-filter-card card mx-3 my-3">
        <img src={car.image ? car.image : "/assets/images/noImage.jpg"} alt="Car" className="car-filter-img img-fluid" />
        <div className="card-body">
          <p className="card-text fw-bold">{car.model}/{car.type ? car.type : "Tipe Mobil"}</p>
          <p className="fw-bold fs-5">Rp {car.rentPerDay} /hari</p>
          <div className="d-flex align-items-center my-2">
            <i data-feather="key" className="car-icon"></i>
            <p className="my-0 mx-2">Start Rent - Finish Rent</p>
          </div>
          <div className="d-flex align-items-center my-2">
            <i data-feather="clock" className="car-icon"></i>
            <p className="my-0 mx-2">{car.updatedAt ? `Updated At ${formatDate(car.updatedAt)}` : car.createdAt ? `Created At ${formatDate(car.createdAt)}` : "Updated At 4 Apr 2022, 09:00"}</p>
          </div>
          <div className="container">
            <div className="row g-2">
              <div className="col-6">
                <button
                  type="button"
                  className="deleteCarButton btn d-block w-100"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i data-feather="trash" className="car-edit-icon"></i> Delete
                </button>
              </div>
              <div className="col-6">
                <button
                  className="editCarButton btn d-block w-100"
                  type="button"
                  onClick={() => setShowEditModal(true)}
                >
                  <i data-feather="edit" className="car-edit-icon"></i> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <CarEditModal

          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          updateCar={updateCar}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <CarDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        />
      )

      }
    </div>
  );
}
