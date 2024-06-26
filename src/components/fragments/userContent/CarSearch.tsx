import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AOS from "aos";
import feather from "feather-icons";
import { Calendar } from "react-feather";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

const CarSearch = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const CustomInput: FC<CustomInputProps> = ({ value, onClick }) => (
    <div className="input-group" onClick={onClick}>
      <input
        type="text"
        className="form-control datepicker text-l-12"
        value={value ? value : ""}
        onChange={() => {}}
        placeholder="Tanggal Sewa"
        required
      />
      <div role="right-icon" className="input-group-text">
        <Calendar className="form-icon" />
      </div>
    </div>
  );
  useEffect(() => {
    feather.replace();
    AOS.init({
      once: true,
    });
    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <div>
      <section id="main" className="main-section">
        <div className="container-fluid pl-14">
          <div className="row">
            <div className="col-12 col-md-6 main-text-container">
              <p className="text-b-36">
                Sewa &amp; Rental Mobil Terbaik di kawasan &#40;Lokasimu&#41;
              </p>
              <p className="text-l-14">
                Selamat datang di Binar Car Rental. Kami menyediakan mobil
                kualitas terbaik dengan harga terjangkau. Selalu siap melayani
                kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
            </div>
            <div className="col-12 col-md-6 main-img-container">
              <div className="car-bg">
                <img
                  src={"/assets/images/Mercedes-Car.png"}
                  className="car-img figure-img img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="car-search">
          <form id="car-search-form" noValidate>
            <div className="row">
              <div className="col g-2">
                <label htmlFor="driver" className="form-label text-l-12">
                  Tipe Driver
                </label>
                <select
                  id="driver"
                  name="Tipe Driver"
                  className="form-select text-l-12"
                  required
                >
                  <option value="" hidden disabled selected>
                    Pilih Tipe Driver
                  </option>
                  <option value="1">Dengan Sopir</option>
                  <option value="0">Tanpa Sopir (Lepas Kunci)</option>
                </select>
              </div>
              <div className="col g-2">
                <label htmlFor="date" className="form-label text-l-12">
                  Tanggal
                </label>
                <div className="input-group-date d-flex">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                      <CustomInput
                        value={startDate ? startDate.toDateString() : ""}
                        onClick={() => {}}
                      />
                    }
                  />
                </div>
              </div>
              <div className="col g-2">
                <label htmlFor="time" className="form-label text-l-12">
                  Waktu Jemput/Ambil
                </label>
                <select
                  id="time"
                  name="Waktu Sewa"
                  className="form-select text-l-12"
                  required
                >
                  <option value="" hidden selected disabled>
                    Pilih Waktu
                  </option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
              </div>
              <div className="col g-2">
                <label htmlFor="passengers" className="form-label text-l-12">
                  Jumlah Penumpang (optional)
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    id="passengers"
                    name="Jumlah Penumpang"
                    className="form-control text-l-12"
                    placeholder="Jumlah Penumpang"
                  />
                  <span className="input-group-text">
                    <i data-feather="users" className="form-icon"></i>
                  </span>
                </div>
              </div>
              <div className="col-2 g-2 position-relative">
                <button
                  type="submit"
                  className="btn btn-register text-b-14 position-absolute bottom-0 w-100"
                  id="search-btn"
                >
                  Cari Mobil
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CarSearch;