import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink } from "react-router-dom";

const NavbarComponents = () => {
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

 return (
  <div>
   <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
    <Container>
     <Navbar.Brand href="#home" className="fs-3 fw-bold text-white">
      <img
       src={"/logo1-wb.png"}
       width="35"
       className="d-inline-block align-top"
       alt="Logo"
      />{" "}
      FLICK BOX
     </Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto text-center">
       {navLinks.map((link) => {
        return (
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
        );
       })}
       {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Login</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
       </NavDropdown> */}
      </Nav>

      <div className="text-center">
       <button className="btn btn-outline-light rounded-1">Sign In</button>
      </div>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </div>
 );
};

export default NavbarComponents;
