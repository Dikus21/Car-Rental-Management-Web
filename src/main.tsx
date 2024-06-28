import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/login';
import AdminLayouts from './components/layouts/AdminLayouts';
import Dashboard from './components/fragments/adminContent/Dashboard';
import CarLists from './components/fragments/adminContent/carListCard/CarLists';
import CarAdd from './components/fragments/adminContent/CarAdd';
import UserLayouts from './components/layouts/UserLayouts';
import HomeContent from './components/fragments/userContent/HomeContent';
import CarSearch from './components/fragments/userContent/CarSearch';

const router = createBrowserRouter([
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
    path: 'login',
    element: <LoginPage />
  },
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
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
