import React, { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface UserLayoutsProps {
    children: ReactNode;
    }

const UserLayouts: FC<UserLayoutsProps> = ({children}) => {
  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-main pt-navbar px-14 fixed-top">
              <div className="container-fluid">
                  <Link className="navbar-brand" to="/">
                      <img src="/assets/images/logo.png" alt="logo" className="logo d-inline-block align-text-top"/>
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="offcanvas offcanvas-end w-50" tabIndex={-1} id="offcanvasRight"
                       aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header d-md-none">
                          <p className="offcanvas-title text-b-16 offcanvas-logo" id="offcanvasRightLabel">BCR</p>
                          <button type="button" className="btn offcanvas-btn-close ms-auto" data-bs-dismiss="offcanvas"
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
          {children}
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
                          <img src='/assets/images/list-item.png' alt=""/>
                      </div>
                      <div className="col-md-3 footer-4">
                          <p className="text-l-14">Copyright Binar 2022</p>
                          <img src="/assets/images/logo.png" alt="logo"/>
                      </div>
                  </div>
              </div>
          </section>
    </div>
  )
}

export default UserLayouts;
