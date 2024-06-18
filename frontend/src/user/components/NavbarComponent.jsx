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
 });

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
      {user ? (
       <Nav className="mx-50 text-center">
        <div className="d-flex align-items-center">
         <p className="text-white my-0 fs-6 fw-medium me-3">
          Hi, {user.username}
         </p>{" "}
         <hr />
         <button
          className="btn-orange fs-6 fw-medium rounded-2"
          onClick={handleLogout}
         >
          Logout
         </button>
        </div>
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
