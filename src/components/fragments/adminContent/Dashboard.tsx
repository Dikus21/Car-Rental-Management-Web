import React from 'react';
import { CarProps, CarsListContext } from './carListCard/carTypes';
import { formatDate, formatDateTime } from '../../../utils/function';

const Dashboard = () => {
  console.log('Dashboard');
  const carContext = React.useContext(CarsListContext);

  return (
    <>
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
            {carContext?.cars.map((car: CarProps) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.model}</td>
                <td>{car.manufacture}</td>
                <td>Rp {Number(car.rentPerDay).toLocaleString('id-ID', { currency: 'IDR' })}</td>
                <td>{car.startRent ? formatDate(car.startRent) : '-'}</td>
                <td>{car.endRent ? formatDate(car.endRent) : '-'}</td>
                <td>{car.createdAt ? formatDateTime(car.createdAt) : '-'}</td>
                <td>{car.updatedAt ? formatDateTime(car.updatedAt) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
