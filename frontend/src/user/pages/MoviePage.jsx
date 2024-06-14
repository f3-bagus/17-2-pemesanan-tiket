import { useState } from "react";
import {
 Container,
 Row,
 Col,
 Card,
 Button,
 Accordion,
 Modal,
} from "react-bootstrap";
import { posterMovies } from "../data/index";
import { useNavigate } from "react-router-dom";

const MoviePage = ({ match }) => {
 let navigate = useNavigate();

 const [show, setShow] = useState(false);

 const handleShow = () => setShow(true);
 const handleClose = () => setShow(false);

 const handleBack = () => {
  navigate(-1); // Go back to the previous page
 };

 const movieId = 1; // Replace with the ID you want to retrieve

 const movie = posterMovies.find((m) => m.id === movieId);

 const date = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
 });

 const times = ["12:10", "14:25", "16:40", "17:15", "18:55"];

 return (
  <div className="user-movie">
   <Container className="min-vh-100">
    <div className="back-button d-flex align-items-center">
     <Button
      variant="light"
      onClick={handleBack}
      style={{ border: "none", background: "none" }}
     >
      <i className="fa-solid fa-arrow-left"></i>
     </Button>
    </div>
    <Row className="justify-content-md-center">
     <Col md={3}>
      <Card className="poster-card">
       <Card.Img
        className="w-100 rounded-4"
        variant="top"
        src={movie.image}
        alt={movie.title}
       />
      </Card>
      <div className="d-grid gap-2 pt-3">
       <Button
        className="btn-dark btn-lg rounded-3 me-2 mb-xs-0 mb-2"
        onClick={handleShow}
       >
        Watch trailer
       </Button>
      </div>
     </Col>
     <Col md={6}>
      <h1 className="fw-bold">{movie.title}</h1>
      <h5>{movie.genre}</h5>
      <div className="icon-duration">
       <i className="fa-regular fa-clock"></i>
       <h6>{movie.duration}</h6>
      </div>
      <div className="icon-age">
       <i className="fa-solid fa-shield"></i>
       <h6>{movie.age}</h6>
      </div>
      <div className="icon-price">
       <i className="fa-solid fa-ticket"></i>
       <h6>{movie.price}</h6>
      </div>
      <p>
       <strong>Director</strong> <br />
       {movie.director}
      </p>
      <p>
       <strong>Writer</strong> <br />
       {movie.writer}
      </p>
      <p>
       <strong>Cast</strong> <br />
       {movie.cast}
      </p>
      <p>
       <strong>Synopsis</strong> <br />
       {movie.synopsis}
      </p>
     </Col>
    </Row>
    <Row className="justify-content-md-center">
     <Col md={9}>
      <h3 className="fw-bold">Available Tickets</h3>
     </Col>
    </Row>
    <Row className="justify-content-md-center pt-2 pb-5">
     <Accordion defaultActiveKey="0" className="w-75">
      <Accordion.Item eventKey="0">
       <Accordion.Header>{date}</Accordion.Header>
       <Accordion.Body>
        {times.map((time, index) => (
         <button
          className="btn btn-outline-dark m-1"
          onClick={() => navigate("/seat-picker")}
          key={index}
         >
          {time}
         </button>
        ))}
       </Accordion.Body>
      </Accordion.Item>
     </Accordion>
    </Row>

    {/* Trailer Modal */}
    <Modal show={show} onHide={handleClose} size="lg" centered>
     <Modal.Header closeButton>
      <Modal.Title>Watch Trailer</Modal.Title>
     </Modal.Header>
     <Modal.Body>
      <div className="embed-responsive embed-responsive-16by9">
       <iframe
        className="embed-responsive-item"
        src={`https://www.youtube.com/embed/${movie.trailer}`}
        allowFullScreen
        title="Trailer"
       ></iframe>
      </div>
     </Modal.Body>
    </Modal>
   </Container>
  </div>
 );
};

export default MoviePage;
