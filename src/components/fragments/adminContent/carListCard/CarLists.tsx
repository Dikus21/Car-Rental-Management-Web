import React, { useEffect, useState } from 'react';
import Notification from '../../../elements/Notification/Notification';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CarCard from './CarCard';
import { CarProps } from './carTypes';
import { getCarList } from '../../../../services/car/car.services';

const CarLists = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationColor, setNotificationColor] = useState('');
  const [isRefresh, setRefresh] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.notificationMessage) {
      setNotificationMessage(location.state.notificationMessage);
      setNotificationColor(location.state.notificationColor);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  useEffect(() => {
    if (isRefresh) {
      getCarList()
        .then(({ success, data }) => {
          if (success) {
            console.log('getCarList success');
            setRefresh(false);
            setCars(data);
          }
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === 'AbortError') {
            console.log('fetch aborted.');
          }
        });
    }
  }, [isRefresh, setRefresh]);

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage('');
        setNotificationColor('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  return (
    <>
      {notificationMessage && (
        <Notification color={notificationColor}>{notificationMessage}</Notification>
      )}
      <div className="container-fluid navbar mb-4">
        <b className="fw-bold fs-3">List Car</b>
        <div className="d-flex flex-row">
          <Link to="/admin/cars/add" className="btn btn-dark-blue text-white">
            <i data-feather="plus"></i>
            Add New Car
          </Link>
        </div>
      </div>
      <div className="container-fluid d-flex gap-3 px-0">
        <button className="highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 p-1 px-2">
          All
        </button>
        <button className="highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 opacity-25 px-2">
          Small
        </button>
        <button className="highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 opacity-25 px-2">
          Medium
        </button>
        <button className="highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 opacity-25 px-2">
          Large
        </button>
      </div>
      <div id="cars-card-container" className="container-fluid d-flex flex-wrap">
        {cars.map((car) => (
          <CarCard
            car={car}
            key={car.id}
            setRefresh={setRefresh}
            setNotificationMessage={setNotificationMessage}
            setNotificationColor={setNotificationColor}
          />
        ))}
      </div>
    </>
  );
};

export default CarLists;
