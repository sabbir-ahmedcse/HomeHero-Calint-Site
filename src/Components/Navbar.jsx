import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold text-lg" // ✅ increased text size
      : "text-base hover:text-yellow-200 transition text-lg"; // ✅ uniform size

  const links = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
      <li><NavLink to="/add-service" className={linkClass}>Add Service</NavLink></li>
      <li><NavLink to="/my-services" className={linkClass}>My Services</NavLink></li>
      <li><NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink></li>
      <li><NavLink to="/profile" className={linkClass}>Profile</NavLink></li>

      {!user && (
        <>
          <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
          <li><NavLink to="/register" className={linkClass}>Register</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-rose-600 text-white py-3 px-6 fixed top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white hover:bg-white/10 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-2xl w-56"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-white hover:scale-105 transition-transform"
        >
          Home<span className="text-yellow-300 ml-0 p-0">Hero</span>
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 space-x-4">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end hidden md:flex">
        {user && (
          <button
            onClick={handleSignOut}
            className="bg-white text-purple-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
