import { useEffect, useState } from 'react';
import feather from 'feather-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import BreadCrumbs from '../fragments/adminContent/BreadCrumbs';
import { CarProps, CarsListContext } from '../fragments/adminContent/carListCard/carTypes';
import { getCarList } from '../../services/car/car.services';
import { Link } from 'react-router-dom';

const AdminLayouts = () => {
  console.log('Admin Layouts');
  const { user, logoutUser, isAdmin, isInitialize } = useAuth();
  const [cars, setCars] = useState<CarProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialize) {
      if (!isAdmin) {
        navigate('/#main');
      } else fetchCarList();
    }
    feather.replace();
  }, [isInitialize]);

  const fetchCarList = async () => {
    console.log('getCarList');
    await getCarList()
      .then(({ success, data }) => {
        if (success) {
          console.log('getCarList success');
          setCars(data);
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted.');
        }
      });
  };

  const onLogout = async () => {
    await logoutUser().then((res) => {
      console.log(res);
    });
  };

  // if (isInitialize) {
  //   return <div className="d-flex justify-content-center align-items-center h-screen">Loading....</div>;
  // }
  return (
    <div className="container-fluid g-container">
      <aside className="sidebar d-flex justify-content-center vh-100">
        <ul>
          <li className="d-flex justify-content-center mb-3">
            <img
              src={'/assets/images/logo-admin.png'}
              alt="logo"
              className="d-inline-block align-text-top"
              width="34"
              height="34"
            />
          </li>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `d-flex flex-column align-items-center text-light link-underline link-underline-opacity-0 p-2 ${
                  isActive ? 'highlight' : ''
                }`
              }>
              <i data-feather="home"></i>
              <span className="text-nowrap">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/admin/cars'}
              className={({ isActive }) =>
                `d-flex flex-column align-items-center text-light link-underline link-underline-opacity-0 p-2 ${
                  isActive ? 'highlight' : ''
                }`
              }>
              <i data-feather="truck"></i>
              <span>Cars</span>
            </NavLink>
          </li>
        </ul>
      </aside>
      <main className="main-content" id="main-content">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <img
              src="/assets/images/logo-admin.png"
              alt=""
              className="d-inline-block align-text-top"
            />
            <div className="d-flex flex-row">
              <form className="d-flex" role="search">
                <input
                  className="form-control navbar-search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success navbar-search-button">Search</button>
              </form>
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
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <BreadCrumbs>
          <CarsListContext.Provider value={{ cars, fetchCarList }}>
            <Outlet />
          </CarsListContext.Provider>
        </BreadCrumbs>
      </main>
    </div>
  );
};

export default AdminLayouts;
