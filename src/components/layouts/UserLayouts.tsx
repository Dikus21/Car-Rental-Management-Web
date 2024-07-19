import React, { useEffect } from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HashLink } from 'react-router-hash-link';

const UserLayouts = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logoutUser } = useAuth();
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated) {
      navigate('/');
    }
  }, [isAdmin, isAuthenticated]);

  const onLogout = async () => {
    await logoutUser().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-main pt-navbar px-14 fixed-top">
        <div className="container-fluid">
          <HashLink className="navbar-brand" to="/#main">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              className="logo d-inline-block align-text-top"
            />
          </HashLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end w-50"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header d-md-none">
              <p className="offcanvas-title text-b-16 offcanvas-logo" id="offcanvasRightLabel">
                BCR
              </p>
              <button
                type="button"
                className="btn offcanvas-btn-close ms-auto"
                data-bs-dismiss="offcanvas"
                aria-label="Close">
                <i data-feather="x" className="x-icon"></i>
              </button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav ms-auto gap-2 d-flex align-items-center">
                <li className="nav-item">
                  <HashLink className="nav-link active text-r-14" to="/#our-services">
                    Our Services
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link active text-r-14" to="/#why-us">
                    Why Us
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link active text-r-14" to="/#testimonial">
                    Testimonial
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link active text-r-14" to="/#faq">
                    FAQ
                  </HashLink>
                </li>
                <li className="nav-item d-flex gap-4">
                  {isAuthenticated ? (
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div className="bg-info rounded-circle text-center navbar-user-initial">
                          {user?.initialUserName}
                        </div>
                        {user?.name}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Settings
                          </a>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={onLogout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      <button
                        aria-label="Login"
                        type="button"
                        className="btn btn-register text-b-14 px-4"
                        onClick={() => navigate('/login')}>
                        Login
                      </button>
                      <button
                        type="button"
                        className="btn btn-register text-b-14"
                        onClick={() => navigate('/register')}>
                        Register
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <section id="footer" className="mx-14">
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
              <img src="/assets/images/list-item.png" alt="" />
            </div>
            <div className="col-md-3 footer-4">
              <p className="text-l-14">Copyright Binar 2022</p>
              <img src="/assets/images/logo.png" alt="logo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLayouts;
