import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AuthLayouts = () => {
  console.log('Login Page');

  return (
    <>
      <div className="container-fluid">
        <div className="row login-container">
          <div className="col-md-8 background-image"></div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div style={{ width: '65%' }}>
              <Link to="/">
                <img src="/assets/images/logo.png" alt="adminLogo" className="mb-4" />
              </Link>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayouts;
