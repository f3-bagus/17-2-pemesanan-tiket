import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterComponent = () => {
 return (
  <div className="footer pt-5">
   <Container>
    <Row className="d-flex justify-content-between">
     <Col lg="4">
      <img src="../logo-b.svg" width={45} alt="" />
      <p>
       FlickBox is an online platform that allows you to book movie tickets
       easily and conveniently from your computer or mobile device.
      </p>
     </Col>
     <Col lg="3" className="mt-lg-0 mt-4">
      <h6 className="fw-bold mb-3">Stay Tune in Our Social Media</h6>
      <div className="social mt-3">
       <i class="fa-brands fa-instagram"></i>
       <i class="fa-brands fa-x-twitter"></i>
       <i class="fa-brands fa-tiktok"></i>
       <i class="fa-brands fa-youtube"></i>
       <i class="fa-brands fa-facebook"></i>
      </div>
     </Col>
    </Row>
    <Row>
     <Col>
      <p className="text-center px-md-0 px-1">
       &copy; Copyright {new Date().getFullYear()} by 17-2 Capstone Project
       Gamelab, All Right Reserved
      </p>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default FooterComponent;
