import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <NavLink className="sidebar-brand brand-logo" to="/admin/dashboard">
          <img src="/assets/images/logo.svg" alt="logo" />
        </NavLink>
        <NavLink className="sidebar-brand brand-logo-mini" to="/admin/dashboard">
          <img src="/assets/images/logo-mini.svg" alt="logo" />
        </NavLink>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle"
                  src="/assets/images/faces/face15.jpg"
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
              </div>
            </div>
            <a href="#" id="profile-dropdown" data-toggle="dropdown">
              <i className="mdi mdi-dots-vertical"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
              aria-labelledby="profile-dropdown"
            >
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-primary"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">
                    Account settings
                  </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-onepassword text-info"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">
                    Change Password
                  </p>
                </div>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>
        <li className={`nav-item menu-items ${isActive("/admin/dashboard") ? 'active' : ''}`}>
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/admin/dashboard"
          >
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li className={`nav-item menu-items ${isActive("/admin/schedule") ? 'active' : ''}`}>
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/admin/schedule"
          >
            <span className="menu-icon">
              <i className="mdi mdi-calendar-month"></i>
            </span>
            <span className="menu-title">Schedules</span>
          </NavLink>
        </li>
        <li className={`nav-item menu-items ${isActive("/admin/movie") ? 'active' : ''}`}>
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/admin/movie"
          >
            <span className="menu-icon">
              <i className="mdi mdi-movie"></i>
            </span>
            <span className="menu-title">Movies</span>
          </NavLink>
        </li>
        <li className={`nav-item menu-items ${isActive("/admin/users") ? 'active' : ''}`}>
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
