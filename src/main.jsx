import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import './App.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'aos/dist/aos.js'
import Home from './pages/Home.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CarPage} from "./pages/Car.jsx";
import {LoginPage} from "./pages/Login.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AdminCar from "./pages/adminCar.jsx";
import AdminCarAdd from "./pages/adminCarAdd.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
    },
    {
        path:"car",
        element:<CarPage/>
    },
    {
        path:"/login",
        element:<LoginPage/>
    },
    {
        path:"/admin",
        element:<AdminDashboard/>
    },
    {
        path:"/admin/cars",
        element:<AdminCar/>
    },
    {
        path:"/admin/cars/add",
        element:<AdminCarAdd/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
