// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router"; // ✅ ঠিক import
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import ServiceDetails from "../Pages/ServiceDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddService from "../Pages/AddService";
import MyServices from "../Pages/MyServices";
import MyBookings from "../Pages/MyBookings";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/",
         element: <Home />,
         
        },
      { path: "/services", element: <Services /> },
      { path: "/service/:id", element: <ServiceDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Private Routes
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
