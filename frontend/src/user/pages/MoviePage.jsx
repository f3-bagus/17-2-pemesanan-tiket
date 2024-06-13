import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { posterMovies } from "../data/index";

const MoviePage = ({ match }) => {
 const movieId = 1; // Ganti dengan ID yang ingin diambil
 const movie = posterMovies.find((m) => m.id === movieId);

 return (
  <div className="user-movie">
   <Container className="min-vh-100">
    <Row>
     <Col md={3}>
      <Card className="poster-card">
       <Card.Img
        className="w-100 rounded-4"
        variant="top"
        src={movie.image}
        alt={movie.title}
       />
      </Card>
     </Col>
     <Col md={8}>
      <h1 className="fw-bold">{movie.title}</h1>
      <h5>{movie.genre}</h5>
      <div className="icon-duration">
       <i class="fa-regular fa-clock"></i>
       <h6>{movie.duration}</h6>
      </div>
      <div className="icon-age">
       <i class="fa-solid fa-shield"></i>
       <h6>{movie.age}</h6>
      </div>
      <div className="icon-price">
       <i class="fa-solid fa-ticket"></i>
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
      <button className="btn btn-dark btn-lg rounded-1 me-2 mb-xs-0 mb-2">
       Watch Trailer
      </button>
      <button className="btn btn-warning btn-lg rounded-1 mb-xs-0 mb-2">
       Get Ticket
      </button>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default MoviePage;
