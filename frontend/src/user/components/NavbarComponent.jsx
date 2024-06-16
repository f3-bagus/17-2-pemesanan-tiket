import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarComponents = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const [changeColor, setChangeColor] = useState(false);

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

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []);

  useEffect(() => {
    // Fungsi untuk mendapatkan data pengguna dari backend
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className={`user-navbar ${changeColor ? "color-active" : ""}`}
      >
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
            {user ? (
              <Nav className="ms-auto text-center">
                <div className="d-flex align-items-center">
                  <p className="text-white m-0 fs-5 me-3">Hi {user.username}</p>
                  <button
                    className="btn btn-outline-light rounded-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </Nav>
            ) : (
              <div className="text-center">
                <button
                  className="btn btn-outline-light rounded-1"
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
