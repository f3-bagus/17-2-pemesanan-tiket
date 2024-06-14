import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import "../css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarComponents = () => {
 let navigate = useNavigate();

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

 // Definisi navLinks
 const navLinks = [
  { id: 1, path: "/", text: "Home" },
  { id: 2, path: "/ticket", text: "My Ticket" },
  { id: 3, path: "/account", text: "Account" },
 ];

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
      />{" "}
      FLICKBOX
     </Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-user-navbar-nav" />
     <Navbar.Collapse id="basic-user-navbar-nav">
      <Nav className="ms-auto text-center">
       {navLinks.map((link) => (
        <div className="nav-link" key={link.id}>
         <NavLink
          to={link.path}
          className={({ isActive, isPending }) =>
           isPending ? "pending" : isActive ? "active" : ""
          }
          end
         >
          {link.text}
         </NavLink>
        </div>
       ))}
      </Nav>

      <div className="text-center">
       <button
        className="btn btn-outline-light rounded-1"
        onClick={() => navigate("/login")}
       >
        Sign In
       </button>
      </div>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </div>
 );
};

export default NavbarComponents;
