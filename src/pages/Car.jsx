import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import AOS from 'aos'
import feather from 'feather-icons'
import {Link} from "react-router-dom";
import {Calendar} from "react-feather";

export const CarPage = () => {
    const [startDate, setStartDate] = useState(null);
    const CustomInput = ({value, onClick}) => (
        <div className="input-group" onClick={onClick}>
            <input type="text" className="form-control datepicker text-l-12" value={value ? value : ""} onChange={() => {
            }} placeholder="Tanggal Sewa" required/>
            <div role="right-icon" className="input-group-text">
                <Calendar className="form-icon"/>
            </div>
        </div>
    );
    useEffect(() => {
        feather.replace();
        AOS.init({
            once:true
        });
        return () => {
            AOS.refresh();
        };
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-main pt-navbar px-14 fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/assets/images/logo.png" alt="" className="logo d-inline-block align-text-top"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasRight"
                         aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header d-md-none">
                            <p className="offcanvas-title text-b-16 offcanvas-logo" id="offcanvasRightLabel">BCR</p>
                            <button type="button" className="btn offcanvas-btn-close ms-auto"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"><i data-feather="x" className="x-icon"></i></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav ms-auto gap-2">
                                <li className="nav-item">
                                    <a className="nav-link active text-r-14" href="#our-services">Our Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-r-14" href="#why-us">Why Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-r-14" href="#testimonial">Testimonial</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-r-14" href="#faq">FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-register text-b-14">Register</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <section id="main" className="main-section">
                <div className="container-fluid pl-14">
                    <div className="row">
                        <div className="col-12 col-md-6 main-text-container">
                            <p className="text-b-36">Sewa &amp; Rental Mobil Terbaik di kawasan &#40;Lokasimu&#41;</p>
                            <p className="text-l-14">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
                                terbaik
                                dengan
                                harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
                        </div>
                        <div className="col-12 col-md-6 main-img-container">
                            <div className="car-bg">
                                <img src={"/assets/images/Mercedes-Car.png"} className="car-img figure-img img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="car-search">
                    <form id="car-search-form" noValidate>
                        <div className="row">
                            <div className="col g-2">
                                <label htmlFor="driver" className="form-label text-l-12">Tipe Driver</label>
                                <select id="driver" name="Tipe Driver" className="form-select text-l-12" required>
                                    <option value="" hidden disabled selected>Pilih Tipe Driver</option>
                                    <option value="1">Dengan Sopir</option>
                                    <option value="0">Tanpa Sopir (Lepas Kunci)</option>
                                </select>
                            </div>
                            <div className="col g-2">
                                <label htmlFor="date" className="form-label text-l-12">Tanggal</label>
                                <div className="input-group-date d-flex">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        customInput={<CustomInput />}
                                    />
                                </div>
                            </div>
                            <div className="col g-2">
                                <label htmlFor="time" className="form-label text-l-12">Waktu Jemput/Ambil</label>
                                <select id="time" name="Waktu Sewa" className="form-select text-l-12" placeholder="test"
                                        required>
                                <option value="" hidden selected disabled>Pilih Waktu</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                </select>
                            </div>
                            <div className="col g-2">
                                <label htmlFor="passengers" className="form-label text-l-12">Jumlah Penumpang
                                    (optional)</label>
                                <div className="input-group">
                                    <input type="number" id="passengers" name="Jumlah Penumpang"
                                           className="form-control text-l-12"
                                           placeholder="Jumlah Penumpang"/>
                                    <span className="input-group-text">
                                <i data-feather="users" className="form-icon"></i>
                            </span>
                                </div>
                            </div>
                            <div className="col-2 g-2 position-relative">
                                <button type="submit" className="btn btn-register text-b-14 position-absolute bottom-0 w-100"
                                        id="search-btn">Cari Mobil
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <div id="cars-container" className="container-fluid d-flex justify-content-center flex-wrap"></div>

            <section id="footer" className="mx-14 pt-10">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <p className="text-l-14">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                            <p className="text-l-14">binarcarrental@gmail.com</p>
                            <p className="text-l-14">081-233-334-808</p>
                        </div>
                        <div className="col-md-2 footer-2">
                            <p className="text-l-14">Our Services</p>
                            <p className="text-l-14">Why Us</p>
                            <p className="text-l-14">Testimonial</p>
                            <p className="text-l-14">FAQ</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-l-14">Connect with us</p>
                            <img src="/assets/images/list-item.png" alt="list-item"/>
                        </div>
                        <div className="col-md-3 footer-4">
                            <p className="text-l-14">Copyright Binar 2022</p>
                            <img src="/assets/images/logo.png" alt="logo"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
