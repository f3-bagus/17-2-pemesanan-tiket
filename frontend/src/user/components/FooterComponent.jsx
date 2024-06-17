import { Container, Row, Col, Button } from "react-bootstrap";

const FooterComponent = () => {
 const handleInstagramClick = () => {
  window.open("https://www.instagram.com", "_blank"); // Menggunakan window.open untuk membuka dalam tab baru
 };
 const handleTiktokClick = () => {
  window.open("https://www.tiktok.com", "_blank");
 };
 const handleXClick = () => {
  window.open("https://www.x.com", "_blank");
 };
 const handleYoutubeClick = () => {
  window.open("https://www.youtube.com", "_blank");
 };
 const handleFacebookClick = () => {
  window.open("https://www.facebook.com", "_blank");
 };

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
       <Button
        className="px-0"
        variant="light"
        onClick={handleInstagramClick}
        style={{ border: "none", background: "none" }}
       >
        <i className="fa-brands fa-instagram"></i>
       </Button>
       <Button
        className="px-0"
        variant="light"
        onClick={handleXClick}
        style={{ border: "none", background: "none" }}
       >
        <i class="fa-brands fa-x-twitter"></i>
       </Button>
       <Button
        className="px-0"
        variant="light"
        onClick={handleTiktokClick}
        style={{ border: "none", background: "none" }}
       >
        <i class="fa-brands fa-tiktok"></i>
       </Button>
       <Button
        className="px-0"
        variant="light"
        onClick={handleYoutubeClick}
        style={{ border: "none", background: "none" }}
       >
        <i class="fa-brands fa-youtube"></i>
       </Button>
       <Button
        className="px-0"
        variant="light"
        onClick={handleFacebookClick}
        style={{ border: "none", background: "none" }}
       >
        <i class="fa-brands fa-facebook"></i>
       </Button>
      </div>
     </Col>
    </Row>
    <Row>
     <Col>
      <p className="text-center px-md-0 px-1">
       &copy; Copyright {new Date().getFullYear()} FlickBox by 17-2 CP Gamelab,
       All Right Reserved
      </p>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default FooterComponent;
