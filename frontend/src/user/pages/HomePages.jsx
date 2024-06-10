import { Container, Col, Row } from "react-bootstrap";
import HeroImage from "../assets/img/hero/hero1.png";
import NavbarComponents from "../components/NavbarComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <NavbarComponents />
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="mb-4">
                Get Your Own <br /> <span>Favourite Movie Ticket</span> <br />{" "}
                Here!
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis quis natus quisquam animi. Maiores, vel.
              </p>
              <button className="btn btn-light btn-lg rounded-1 me-2 mb-xs-0 mb-2">
                Buy Ticket
              </button>
              <button className="btn btn-outline-light btn-lg rounded-1 mb-xs-0 mb-2">
                Movies
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img src={HeroImage} alt="" />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="movies w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold ">Showing Now</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
