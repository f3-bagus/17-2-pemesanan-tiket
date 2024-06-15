import { useState, useEffect } from "react";
import {
 Container,
 Row,
 Col,
 Card,
 Button,
 Accordion,
 Modal,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MoviePage = () => {
 let navigate = useNavigate();
 const { id } = useParams();

 const [film, setFilm] = useState(null);
 const [schedules, setSchedules] = useState([]);
 const [show, setShow] = useState(false);

 const handleShow = () => setShow(true);
 const handleClose = () => setShow(false);

 const handleBack = () => {
  navigate(-1); // Go back to the previous page
 };

 const handleNavigateToSeatPage = (movieId) => {
  console.log("Navigating to SeatPage with movieId:", movieId);
  console.log("Film object being passed:", film);
  navigate(`/seats/${movieId}`, { state: { movie: film } });
 };

 useEffect(() => {
  const fetchFilm = async () => {
   try {
    const response = await axios.get(`http://localhost:3000/api/films/${id}`);
    console.log("Fetched film data:", response.data);
    setFilm(response.data);
   } catch (error) {
    console.error("Error fetching film:", error);
   }
  };

  fetchFilm();
 }, [id]);

 if (!film) return <div>Loading...</div>;

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
        src={`http://localhost:3000/uploads/members/${film.images[0].filename}`}
        alt={film.name_film}
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
      <h1 className="fw-bold">{film.name_film}</h1>
      <h5>{film.genre}</h5>
      <div className="icon-duration">
       <i className="fa-regular fa-clock"></i>
       <h6>{film.duration}</h6>
      </div>
      <div className="icon-age">
       <i className="fa-solid fa-shield"></i>
       <h6>{film.age}</h6>
      </div>
      <div className="icon-price">
       <i className="fa-solid fa-ticket"></i>
       <h6>Rp {film.price.toFixed(2)}</h6>
      </div>
      <p>
       <strong>Director</strong> <br />
       {film.director}
      </p>
      <p>
       <strong>Writer</strong> <br />
       {film.writer}
      </p>
      <p>
       <strong>Cast</strong> <br />
       {film.cast}
      </p>
      <p>
       <strong>Synopsis</strong> <br />
       {film.synopsis}
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
          onClick={() => handleNavigateToSeatPage(id)}
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
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="embed-responsive embed-responsive-16by9">
       <iframe
        className="embed-responsive-item"
        src={`https://www.youtube.com/embed/${film.trailer}`}
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
