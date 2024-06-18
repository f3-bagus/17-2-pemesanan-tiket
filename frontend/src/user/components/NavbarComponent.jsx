import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import "../css/main.css"; // Pastikan ini mengarah ke file CSS Anda
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

import profileimg from "../assets/img/profile/user-def-profile.png"; // Gambar profil default

const NavbarComponents = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const [changeColor, setChangeColor] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);

    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.username);
          setProfileImage(response.data.profileImage);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const profileImageSrc = profileImage
    ? `http://localhost:3000/uploads/members/${profileImage}`
    : profileimg;

  return (
    <div>
      <Navbar
        expand="lg"
        className={`user-navbar ${changeColor ? "color-active" : ""}`}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="logo-user-navbar fs-3 fw-bold text-white"
          >
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
            <Nav className="mx-auto text-center">
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
            {username ? (
              <Nav className="mx-50 text-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="text-white d-flex align-items-center nav-link"
                  >
                    Hi, {username}
                    <Image
                      src={profileImageSrc}
                      roundedCircle
                      width="35"
                      height="35"
                      className="me-2"
                      style={{ marginLeft: "12px" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu bg-orange">
                    <Dropdown.Item
                      className="dropdown-item btn-orange fs-6 fw-medium rounded-2 m"
                      onClick={handleLogout}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            ) : (
              <div className="text-center">
                <button
                  className="btn-orange fs-6 fw-medium rounded-2 m"
                  onClick={() => navigate("/login")}
                >
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
