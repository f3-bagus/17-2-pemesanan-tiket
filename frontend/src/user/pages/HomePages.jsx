import { Container, Col, Row, Card } from "react-bootstrap";
import HeroImage from "../assets/img/hero/hero1.png";
import NavbarComponents from "../components/NavbarComponent";

import poster1 from "../assets/img/movie/movie-1.jpeg";
import poster2 from "../assets/img/movie/movie-2.jpeg";
import poster3 from "../assets/img/movie/movie-3.jpeg";
import poster4 from "../assets/img/movie/movie-4.jpeg";
import poster5 from "../assets/img/movie/movie-5.jpeg";
import poster6 from "../assets/img/movie/movie-6.jpeg";
import poster7 from "../assets/img/movie/movie-7.jpeg";
import poster8 from "../assets/img/movie/movie-8.jpeg";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";

const HomePage = () => {
 const posterMovies = [
  { id: 1, image: poster1 },
  { id: 2, image: poster2 },
  { id: 3, image: poster3 },
  { id: 4, image: poster4 },
  { id: 5, image: poster5 },
  { id: 6, image: poster6 },
  { id: 7, image: poster7 },
  { id: 8, image: poster8 },
 ];
 return (
  <div className="homepage">
   <NavbarComponents />
   <header className="w-100 min-vh-100 d-flex align-items-center">
    <Container>
     <Row className="header-box d-flex align-items-center">
      <Col lg="6">
       <h1 className="mb-4">
        Get Your Own <br /> <span>Favourite Movie Ticket</span> <br /> Here!
       </h1>
       <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis
        quis natus quisquam animi. Maiores, vel.
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
     <Row>
      {posterMovies.map((movie) => (
       <Col key={movie.id} className="position-relative movie-poster">
        <Card className="mb-4 rounded">
         <Card.Img
          variant="top"
          src={movie.image}
          alt="poster-film"
          className="w-100"
         />
         <div className="overlay rounded">
          <button className="btn btn-light mb-2">Watch Trailer</button>
          <button className="btn btn-warning">Get Ticket</button>
         </div>
        </Card>
       </Col>
      ))}
     </Row>
    </Container>
   </div>
  </div>
 );
};

export default HomePage;
