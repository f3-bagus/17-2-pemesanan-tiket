import React from "react";
import pict from "../../user/assets/img/profile/user-def-profile.png"
import "../assets/css/style.css";

const Navbar = () => {
  const handleLogout = () => {
    // Hapus token dari sessionStorage
    sessionStorage.removeItem("token");

    // Setelah 2 detik, arahkan ke halaman login
    setTimeout(() => {
      window.location.href = "/login";  // Ganti dengan path menuju halaman login
    }, 2000);
  };

  return (
    <nav className="navbar-admin p-0 fixed-top d-flex flex-row" style={{ left: "244px" }}>
      <div className="navbar-admin-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <a className="navbar-admin-brand brand-logo-mini" href="index.html">
          <img src="/logo-w.svg" alt="logo" />
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
                  Admin
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
              <div className="dropdown-divider"></div>
              <a className="dropdown-item preview-item" onClick={handleLogout}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Log out</p>
                </div>
              </a>
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
