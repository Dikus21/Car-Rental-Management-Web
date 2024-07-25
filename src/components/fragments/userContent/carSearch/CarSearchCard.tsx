import { FC } from 'react';
import { Calendar, Settings, User } from 'react-feather';
import { CarProps } from '../../adminContent/carListCard/carTypes';
import { useNavigate } from 'react-router-dom';

interface CarCardProps {
  car: CarProps;
}

const CarSearchCard: FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center">
      <div className="car-filter-card card mx-3 my-3">
        <img
          src={car.imagePublicId ? car.imageURL : '/assets/images/noImage.jpg'}
          alt="Car"
          className="car-filter-img img-fluid"
        />
        <div className="card-body">
          <p className="card-text fw-bold">
            {car.model}/{car.manufacture}
          </p>
          <p className="fw-bold fs-5">
            Rp {Number(car.rentPerDay).toLocaleString('id-ID', { currency: 'IDR' })} /hari
          </p>
          <p className="fw-semibold">
            {car.description ? truncateText(car.description, 5) : 'No Description'}
          </p>
          <div className="d-flex align-items-center my-2">
            <User className="car-icon" />
            <p className="my-0 mx-2">{car.capacity} Orang</p>
          </div>
          <div className="d-flex align-items-center my-2">
            <Settings className="car-icon" />
            <p className="my-0 mx-2">
              {car.transmission ? capitalizeFirstLetter(car.transmission) : 'Unknown'}
            </p>
          </div>
          <div className="d-flex align-items-center my-2">
            <Calendar className="car-icon" />
            <p className="my-0 mx-2">Tahun {car.year}</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-register w-100 d-flex justify-content-center align-items-center" onClick={() => navigate('/cars/order')}>
              <span className="fw-semibold">Pilih Mobil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSearchCard;
