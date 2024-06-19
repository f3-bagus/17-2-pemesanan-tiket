import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.svg'; // Pastikan path ini benar\
import pict from "../../user/assets/img/profile/user-def-profile.png"

import "../assets/css/style.css";

const Sidebar = () => {
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src="/long-logo.svg" alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img src="/logo-w.svg" alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle"
                  src={pict}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-bold text-light " style={{ fontSize: '0.9rem' }}>Admin</h5>
                <p className="mb-0 font-weight-light text-light" style={{ fontSize: '0.7rem' }}>Administrator</p>
              </div>
            </div>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>
        <li
          className={`nav-item menu-items ${
            isActive("/admin/dashboard") ? "active" : ""
          }`}
        >
          <NavLink
            className="nav-link"
            activeclassname="active"
            to="/admin/dashboard"
          >
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li
          className={`nav-item menu-items ${
            isActive("/admin/schedule") ? "active" : ""
          }`}
        >
          <NavLink
            className="nav-link"
            activeclassname="active"
            to="/admin/schedule"
          >
            <span className="menu-icon">
              <i className="mdi mdi-calendar-month"></i>
            </span>
            <span className="menu-title">Schedules</span>
          </NavLink>
        </li>
        <li
          className={`nav-item menu-items ${
            isActive("/admin/movie") ? "active" : ""
          }`}
        >
          <NavLink
            className="nav-link"
            activeclassname="active"
            to="/admin/movie"
          >
            <span className="menu-icon">
              <i className="mdi mdi-movie"></i>
            </span>
            <span className="menu-title">Movies</span>
          </NavLink>
        </li>
        <li
          className={`nav-item menu-items ${
            isActive("/admin/users") ? "active" : ""
          }`}
        >
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/admin/users"
          >
            <span className="menu-icon">
              <i className="mdi mdi-account"></i>
            </span>
            <span className="menu-title">Users</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
