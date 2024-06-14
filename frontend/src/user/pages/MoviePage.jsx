import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { posterMovies } from "../data/index";
import { useNavigate } from "react-router-dom";

const MoviePage = ({ match }) => {
 let navigate = useNavigate();
 const movieId = 1; // Ganti dengan ID yang ingin diambil
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
       <Button className="btn-orange btn-lg rounded-3 me-2 mb-xs-0 mb-2">
        Watch trailer
       </Button>
       {/* <Button className="btn btn-orange btn-lg rounded-3 me-2 mb-xs-0 mb-2">
        Watch Trailer
       </Button> */}
      </div>
     </Col>
     <Col md={6}>
      <h1 className="fw-bold">{movie.title}</h1>
      <h5>{movie.genre}</h5>
      <div className="icon-duration">
       <i class="fa-regular fa-clock"></i>
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
          className="btn btn-outline-orange m-1"
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
   </Container>
  </div>
 );
};

export default MoviePage;
