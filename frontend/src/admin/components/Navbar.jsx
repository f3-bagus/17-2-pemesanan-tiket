import React from "react";
import logo from "../assets/images/logo-mini.svg";
import pict from "../assets/images/faces/face1.jpg"
import "../assets/css/style.css";

const Navbar = () => {
  return (
    <nav className="navbar-admin p-0 fixed-top d-flex flex-row">
      <div className="navbar-admin-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <a className="navbar-admin-brand brand-logo-mini" href="index.html">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="navbar-admin-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-admin-toggler navbar-admin-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-admin-nav navbar-admin-nav-right">
          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="messageDropdown"
              href="#"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="mdi mdi-email"></i>
              <span className="count bg-success"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-admin-dropdown preview-list"
              aria-labelledby="messageDropdown"
            >
              <h6 className="p-3 mb-0">Messages</h6>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="../assets/images/faces/face4.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Mark send you a message
                  </p>
                  <p className="text-muted mb-0"> 1 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="../assets/images/faces/face2.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Cregh send you a message
                  </p>
                  <p className="text-muted mb-0"> 15 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="../assets/images/faces/face3.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Profile picture updated
                  </p>
                  <p className="text-muted mb-0"> 18 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <p className="p-3 mb-0 text-center">4 new messages</p>
            </div>
          </li>
          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <i className="mdi mdi-bell"></i>
              <span className="count bg-danger"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-admin-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-calendar text-success"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Event today</p>
                  <p className="text-muted ellipsis mb-0">
                    {" "}
                    Just a reminder that you have an event today{" "}
                  </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Settings</p>
                  <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-link-variant text-warning"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Launch Admin</p>
                  <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <p className="p-3 mb-0 text-center">See all notifications</p>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              id="profileDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <div className="navbar-admin-profile">
                <img
                  className="img-xs rounded-circle"
                  src={pict}
                  alt=""
                />
                <p className="mb-0 d-none d-sm-block navbar-admin-profile-name">
                  Henry Klein
                </p>
                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-admin-dropdown preview-list"
              aria-labelledby="profileDropdown"
            >
              <h6 className="p-3 mb-0">Profile</h6>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-success"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Settings</p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Log out</p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <p className="p-3 mb-0 text-center">Advanced settings</p>
            </div>
          </li>
        </ul>
        <button
          className="navbar-admin-toggler navbar-admin-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-format-line-spacing"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
