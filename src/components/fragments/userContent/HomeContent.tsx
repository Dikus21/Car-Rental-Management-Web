import feather from 'feather-icons';
import React, { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, Navigation]);

const HomeContent = () => {
  useEffect(() => {
    feather.replace();
    AOS.init({
      once: true
    });

    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <div>
      <section id="main" className="main-section pl-14">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 main-text-container">
              <p className="text-b-36">
                Sewa &amp; Rental Mobil Terbaik di kawasan &#40;Lokasimu&#41;
              </p>
              <p className="text-l-14">
                Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan
                harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
              <Link to="/cars">
                <button type="button" className="btn btn-register text-b-14">
                  Mulai Sewa Mobil
                </button>
              </Link>
            </div>
            <div className="col-12 col-md-6 main-img-container">
              <div className="car-bg">
                <img
                  src="/assets/images/Mercedes-Car.png"
                  className="car-img figure-img img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our-services">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 our-services-img-container">
              <img
                src="/assets/images/img_service.png"
                alt=""
                className="img-fluid our-services-img"
              />
            </div>
            <div className="col-12 col-md-6 our-services-text-container">
              <p className="text-b-24">
                Best Car Rental for any kind of trip in &#40;Lokasimu&#41;!
              </p>
              <p className="text-l-14">
                Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah
                dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk
                perjalanan wisata, bisnis, wedding, meeting, dll.
              </p>
              <ul className="custom-list text-l-14">
                <p data-aos="fade-up">
                  <i data-feather="check" className="check-icon"></i>Sewa Mobil Dengan Supir di Bali
                  12 Jam
                </p>
                <p data-aos="fade-up">
                  <i data-feather="check" className="check-icon"></i>Sewa Mobil Lepas Kunci di Bali
                  24 Jam
                </p>
                <p data-aos="fade-up">
                  <i data-feather="check" className="check-icon"></i>Sewa Mobil Jangka Panjang
                  Bulanan
                </p>
                <p data-aos="fade-up">
                  <i data-feather="check" className="check-icon"></i>Gratis Antar - Jemput Mobil di
                  Bandara
                </p>
                <p data-aos="fade-up">
                  <i data-feather="check" className="check-icon"></i>Layanan Airport Transfer / Drop
                  In Out
                </p>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us">
        <div className="container-fluid px-14 pb-5">
          <div className="row">
            <div className="col">
              <p className="text-b-24">Why Us?</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="text-l-14">Mengapa harus pilih Binar Car Rental?</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card" data-aos="flip-left">
                <div className="card-body mx-2 mt-2">
                  <p>
                    <img src="/assets/images/thumbs_up-icon.png" className="thumbs-up-icon" />
                  </p>
                  <p className="text-b-16">Mobil Lengkap</p>
                  <p className="text-l-14">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" data-aos="flip-left">
                <div className="card-body mx-2 mt-2">
                  <p>
                    <img src="/assets/images/tag-icon.png" className="tag-icon" />
                  </p>
                  <p className="text-b-16">Mobil Lengkap</p>
                  <p className="text-l-14">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" data-aos="flip-left">
                <div className="card-body mx-2 mt-2">
                  <p>
                    <img src="/assets/images/time-icon.png" className="time-icon" />
                  </p>
                  <p className="text-b-16">Mobil Lengkap</p>
                  <p className="text-l-14">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card" data-aos="flip-left">
                <div className="card-body mx-2 mt-2">
                  <p>
                    <img src="/assets/images/award-icon.png" className="award-icon" />
                  </p>
                  <p className="text-b-16">Mobil Lengkap</p>
                  <p className="text-l-14">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial">
        <div className="container-fluid">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <p className="text-b-24">Testimonial</p>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <p className="text-l-14">Berbagai review positif dari para pelanggan kami</p>
            </div>
          </div>
          <div className="row">
            <Swiper
              spaceBetween={10}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              navigation={{
                nextEl: '.btn-right',
                prevEl: '.btn-left'
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                576: {
                  slidesPerView: 2
                }
              }}>
              <SwiperSlide>
                <div className="item">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-2">
                      <img src="/assets/images/cat1.svg" className="testimonial-image" />
                    </div>
                    <div className="col-md-10 d-flex flex-column">
                      <div className="star">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                      </div>
                      <p className="text-l-14">
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”
                      </p>
                      <p className="text-r-14">John Dee 32, Bromo</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-2">
                      <img src="/assets/images/cat2.svg" className="testimonial-image" />
                    </div>
                    <div className="col-md-10 d-flex flex-column">
                      <div className="star">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                      </div>
                      <p className="text-l-14">
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”
                      </p>
                      <p className="text-r-14">John Dee 32, Bromo</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-2">
                      <img src="/assets/images/cat3.svg" className="testimonial-image" />
                    </div>
                    <div className="col-md-10 d-flex flex-column">
                      <div className="star">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                      </div>
                      <p className="text-l-14">
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”
                      </p>
                      <p className="text-r-14">John Dee 32, Bromo</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-2">
                      <img src="/assets/images/cat2.svg" className="testimonial-image" />
                    </div>
                    <div className="col-md-10 d-flex flex-column">
                      <div className="star">
                        {Array(5)
                          .fill(null)
                          .map((_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                      </div>
                      <p className="text-l-14">
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”
                      </p>
                      <p className="text-r-14">John Dee 32, Bromo</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <button className="btn btn-left mx-2">
                <i data-feather="chevron-left"></i>
              </button>
              <button className="btn btn-right mx-2">
                <i data-feather="chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="banner" className="mx-14">
        <div className="container-fluid px-5">
          <div className="row justify-content-center">
            <p className="text-b-36 text-center mb-0">Sewa Mobil di (Lokasimu) Sekarang</p>
            <p className="text-l-14 text-center mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <button type="button" className="btn btn-register text-b-14 mt-4">
              Mulai Sewa Mobil
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-14">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 d-flex flex-column faq-left">
              <p className="text-b-24">Frequently Asked Question</p>
              <p className="text-l-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="col-md-7">
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-l-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne">
                      Apa saja syarat yang dibutuhkan?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>This is the first item&apos;s accordion body.</strong> It is shown by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&apos;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed text-l-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo">
                      Berapa hari minimal sewa mobil lepas kunci?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>This is the second item&apos;s accordion body.</strong> It is hidden
                      by default, until the collapse plugin adds the appropriate classes that we use
                      to style each element. These classes control the overall appearance, as well
                      as the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&apos;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree">
                      Berapa hari sebelumnya sabaiknya booking sewa mobil?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>This is the third item&apos;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&apos;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed text-l-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour">
                      Apakah Ada biaya antar-jemput?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>This is the third item&apos;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&apos;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed text-l-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive">
                      Bagaimana jika terjadi kecelakaan
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <strong>This is the third item&apos;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&apos;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
