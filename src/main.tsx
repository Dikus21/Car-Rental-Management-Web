import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayouts from './components/layouts/AdminLayouts';
import Dashboard from './components/fragments/adminContent/Dashboard';
import CarLists from './components/fragments/adminContent/carListCard/CarLists';
import CarAdd from './components/fragments/adminContent/CarAdd';
import UserLayouts from './components/layouts/UserLayouts';
import HomeContent from './components/fragments/userContent/HomeContent';
import CarSearch from './components/fragments/userContent/carSearch/CarSearch';
import AuthorizedRoute from './utils/AuthorizedRoute';
import AuthLayouts from './components/layouts/AuthLayouts';
import LoginForm from './components/fragments/userContent/LoginForm';
import RegisterForm from './components/fragments/userContent/RegisterForm';
import NotFound from './components/fragments/NotFound';
import TemporarilyUnavailable from './components/fragments/TemporarilyUnavailable';

const router = createBrowserRouter([
  {
    element: <AuthLayouts />,
    children: [
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'register',
        element: <RegisterForm />
      }
    ]
  },
  {
    element: <UserLayouts />,
    children: [
      {
        path: '/',
        element: <HomeContent />
      },
      {
        path: 'cars',
        element: <CarSearch />
      }
    ]
  },
  {
    element: <AuthorizedRoute />,
    children: [
      {
        element: <AdminLayouts />,
        children: [
          {
            path: 'admin/dashboard',
            element: <Dashboard />
          },
          {
            path: 'admin/cars',
            element: <CarLists />
          },
          {
            path: 'admin/cars/add',
            element: <CarAdd />
          }
        ]
      }
    ]
  },
  {
    element: <TemporarilyUnavailable />,
    children: [
      {
        path: 'cars/order'
      },
      {
        path: 'profile'
      },
      {
        path: 'settings'
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
