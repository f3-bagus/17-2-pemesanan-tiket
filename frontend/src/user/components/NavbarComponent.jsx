import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarComponents = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" className="user-navbar">
        <Container>
          <Navbar.Brand href="#home" className="fs-3 fw-bold text-white">
            <img
              src={"/logo-w.svg"}
              width="35"
              className="d-inline-block align-top"
              alt="Logo"
            />
            FLICKBOX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-user-navbar-nav" />
          <Navbar.Collapse id="basic-user-navbar-nav">
            <Nav className="ms-auto text-center">
              <div className="nav-link">
                <NavLink to="/" className="nav-link" end>
                  Home
                </NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/ticket" className="nav-link" end>
                  My Ticket
                </NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/account" className="nav-link" end>
                  Account
                </NavLink>
              </div>
            </Nav>
            {user ? (
              <Nav className="ms-auto text-center">
                <div className="d-flex align-items-center">
                  <p className="text-white m-0 fs-5 me-3">{user.username}</p> {/* Tambahkan margin end (me-3) untuk memberi ruang di antara username dan logout */}
                  <button className="btn btn-outline-light rounded-1" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </Nav>
            ) : (
              <div className="text-center">
                <button className="btn btn-outline-light rounded-1" onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponents;