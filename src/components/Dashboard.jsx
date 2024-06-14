import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import {format} from 'date-fns'

export default function Dashboard({isRefresh, setRefresh}) {
    const [cars, setCars] = useState([])
  useEffect(() => {
    feather.replace();
  });

  function formatDate(date) {
    return format(date, "d MMM yyyy, HH:mm");
  }

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:8000/cars")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          setCars(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  return (
    <div className="ms-2">
      <p className="mt-4 d-flex align-items-center gap-1">
        <b>Dashboard</b>
        <i
          data-feather="chevron-right"
          width="20"
          height="20"
          className="mt-1"
        />
        <span>Dashboard</span>
      </p>
      <div className="container-fluid navbar mb-4">
        <b className="fw-bold fs-3">DashBoard</b>
      </div>
      <div className="container-fluid d-flex align-items-center">
        <span className="vertical-line me-2"></span>
        <span className="fw-bold fs-5">List Car</span>
      </div>
      <div className="container-fluid d-flex mt-3">
        <table className="table w-100 text-start">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Start Rent</th>
              <th scope="col">Finish Rent</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car,index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{car.model}</td>
                <td>{car.type}</td>
                <td>Rp. {car.rentPerDay}</td>
                <td>{car.startRent || '-'}</td>
                <td>{car.finishRent || '-'}</td>
                <td>{car.createdAt ? formatDate(car.createdAt) : '-'}</td>
                <td>{car.updatedAt ? formatDate(car.updatedAt) : '-'}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
