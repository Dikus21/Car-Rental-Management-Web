import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import feather from 'feather-icons';
import { Calendar } from 'react-feather';
import { CarSearchForm, SearchCarDto, CarSearchProps } from './searchTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { getSearchCars } from '../../../../services/car/car.services';
import { CarProps } from '../../adminContent/carListCard/carTypes';
import CarSearchCard from './CarSearchCard';
import { formatDate } from '../../../../utils/function';

const CarSearch = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CarSearchForm>({
    resolver: yupResolver(SearchCarDto),
    defaultValues: {
      withDriver: '',
      startRent: undefined,
      capacity: null
    }
  });
  const [cars, setCars] = useState<CarProps[]>([]);

  function onSubmit(data: CarSearchForm) {
    const sendData: CarSearchProps = {
      withDriver: data.withDriver,
      startRent: format(data.startRent, 'yyyy-MM-dd'),
      capacity: data.capacity ? data.capacity.toString() : '0'
    };
    getSearchCars(sendData).then((res) => {
      if (res.success) {
        console.log('Search success');
        console.log(res.data);
        setCars(res.data);
      }
    });
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <div>
      <section id="main" className="d-flex flex-row position-relative justify-content-center">
        <div className="container-fluid pl-14">
          <div className="row">
            <div className="col-12 col-md-6 main-text-container">
              <p className="text-b-36">
                Sewa &amp; Rental Mobil Terbaik di kawasan &#40;Lokasimu&#41;
              </p>
              <p className="text-l-14">
                Selamat datang di KeyGO Rental. Kami menyediakan mobil kualitas terbaik dengan harga
                terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
            </div>
            <div className="col-12 col-md-6 main-img-container">
              <div className="car-bg">
                <img
                  src={'/assets/images/Mercedes-Car.png'}
                  className="car-img figure-img img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="car-search border shadow">
          <form id="car-search-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <Controller
                name="withDriver"
                control={control}
                render={({ field }) => (
                  <div className="col g-2">
                    <label htmlFor="withDriver" className="form-label text-l-12">
                      Tipe Driver
                    </label>
                    <select
                      id="withDriver"
                      className={`form-select text-l-12 ${errors.withDriver && 'border-danger'}`}
                      {...field}>
                      <option value="" hidden>
                        Pilih Tipe Driver
                      </option>
                      <option value="true">Dengan Sopir</option>
                      <option value="false">Tanpa Sopir (Lepas Kunci)</option>
                    </select>
                    {errors.withDriver && (
                      <div className="text-danger ms-2">{errors.withDriver.message}</div>
                    )}
                  </div>
                )}
              />
              <Controller
                name="startRent"
                control={control}
                render={({ field }) => (
                  <div className="col g-2">
                    <label htmlFor="startRent" className="form-label text-l-12">
                      Tanggal
                    </label>
                    <div className="input-group-date d-flex">
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        minDate={tomorrow}
                        customInput={
                          <div>
                            <input
                              type="text"
                              className={`form-control datepicker text-l-12 ${
                                errors.startRent && 'border-danger'
                              }`}
                              placeholder="Tanggal Sewa"
                              autoComplete="off"
                              {...field}
                              value={field.value ? formatDate(field.value) : ''}
                            />
                            <div role="right-icon" className="input-group-text">
                              <Calendar className="form-icon" />
                            </div>
                          </div>
                        }
                      />
                    </div>
                    {errors.startRent && (
                      <div className="text-danger ms-2">{errors.startRent.message}</div>
                    )}
                  </div>
                )}
              />
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <div className="col g-2">
                    <label htmlFor="capacity" className="form-label text-l-12">
                      Jumlah Penumpang (optional)
                    </label>
                    <div className={`input-group`}>
                      <input
                        type="number"
                        id="capacity"
                        min={1}
                        className={`form-control text-l-12 border-top-0 border-bottom-0 border-start-0`}
                        placeholder="Jumlah Penumpang"
                        {...field}
                        value={field.value ?? ''}
                      />
                      <span className="input-group-text">
                        <i data-feather="users" className="form-icon"></i>
                      </span>
                    </div>
                  </div>
                )}
              />
              <div className="col-2 g-2 position-relative">
                <button
                  type="submit"
                  className="btn btn-register text-b-14 position-absolute bottom-0 w-100"
                  id="search-btn">
                  Cari Mobil
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <div className="container-flex d-flex flex-wrap mx-4 mt-5 pt-5 justify-content-center">
        <div className="row">
          {cars && cars.map((car) => <CarSearchCard key={car.id} car={car} />)}
        </div>
      </div>
    </div>
  );
};

export default CarSearch;
