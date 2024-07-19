import React, { useContext, useEffect, useState } from 'react';
import Notification from '../../../elements/Notification/Notification';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CarCard from './CarCard';
import { CarProps, CarsListContext } from './carTypes';

const CarLists = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationColor, setNotificationColor] = useState('');
  const [cars, setCars] = useState<CarProps[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const location = useLocation();
  const navigate = useNavigate();
  const carContext = useContext(CarsListContext);
  const carsInit = carContext ? carContext.cars : [];
  const refresh = carContext ? carContext.fetchCarList : () => {};

  useEffect(() => {
    setCars(carsInit);
  }, [carsInit]);

  useEffect(() => {
    if (location.state && location.state.notificationMessage) {
      setNotificationMessage(location.state.notificationMessage);
      setNotificationColor(location.state.notificationColor);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage('');
        setNotificationColor('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const filterAll = () => {
    setCars(carsInit);
    setActiveFilter('all');
  };

  const filterSmall = () => {
    const smallCars = carsInit.filter((car) => car.capacity < 4);
    setCars(smallCars);
    setActiveFilter('small');
  };

  const filterMedium = () => {
    const mediumCars = carsInit.filter((car) => car.capacity >= 4 && car.capacity < 6);
    setCars(mediumCars);
    setActiveFilter('medium');
  };

  const filterLarge = () => {
    const largeCars = carsInit.filter((car) => car.capacity >= 6);
    setCars(largeCars);
    setActiveFilter('large');
  };

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
        <button
          className={`highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 p-1 px-2 ${
            activeFilter === 'all' ? 'opacity-25' : ''
          }`}
          onClick={filterAll}>
          All
        </button>
        <button
          className={`highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 px-2 ${
            activeFilter === 'small' ? 'opacity-25' : ''
          }`}
          onClick={filterSmall}>
          Small
        </button>
        <button
          className={`highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 px-2 ${
            activeFilter === 'medium' ? 'opacity-25' : ''
          }`}
          onClick={filterMedium}>
          Medium
        </button>
        <button
          className={`highlight border-dark-blue rounded-1 text-dark-blue fw-bold fs-5 px-2 ${
            activeFilter === 'large' ? 'opacity-25' : ''
          }`}
          onClick={filterLarge}>
          Large
        </button>
      </div>
      <div id="cars-card-container" className="container-fluid d-flex flex-wrap">
        {cars.map((car) => (
          <CarCard
            car={car}
            key={car.id}
            setRefresh={refresh}
            setNotificationMessage={setNotificationMessage}
            setNotificationColor={setNotificationColor}
          />
        ))}
      </div>
    </>
  );
};

export default CarLists;
