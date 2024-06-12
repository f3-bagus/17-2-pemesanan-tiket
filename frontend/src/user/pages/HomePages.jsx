import { Container, Col, Row, Card } from "react-bootstrap";
import HeroImage from "../assets/img/hero/hero1.png";

import FaqComponents from "../components/FaqComponent";
import { useNavigate } from "react-router-dom";

import poster1 from "../assets/img/movie/movie-1.jpeg";
import poster2 from "../assets/img/movie/movie-2.jpeg";
import poster3 from "../assets/img/movie/movie-3.jpeg";
import poster4 from "../assets/img/movie/movie-4.jpeg";
import poster5 from "../assets/img/movie/movie-5.jpeg";
import poster6 from "../assets/img/movie/movie-6.jpeg";
import poster7 from "../assets/img/movie/movie-7.jpeg";
import poster8 from "../assets/img/movie/movie-8.jpeg";

import promo1 from "../assets/img/promo/promo1.png";
import promo2 from "../assets/img/promo/promo2.png";
import promo3 from "../assets/img/promo/promo3.png";
import promo4 from "../assets/img/promo/promo4.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FaqComponent from "../components/FaqComponent";

const HomePage = () => {
 let navigate = useNavigate();

 const promos = [
  { id: 1, image: promo1 },
  { id: 2, image: promo2 },
  { id: 3, image: promo3 },
  { id: 4, image: promo4 },
 ];

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
   {/* HERO SECTION */}
   <header className="w-100 min-vh-100 d-flex align-items-center">
    <Container>
     <Row className="header-box d-flex align-items-center pt-lg-5">
      <Col lg="6">
       <h1 className="mb-4">
        Get Your Own <br /> <span>Favourite Movie Ticket</span> <br /> Here!
       </h1>
       <p className="mb-4">
        Discover new movies and book your tickets today. <br />
        Enjoy an unforgettable cinema experience.
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

   {/* PROMO SECTION */}
   <div className="promo">
    <Container>
     <Row className="p-5">
      <Swiper
       spaceBetween={30}
       slidesPerView={2} // This sets the number of slides visible to 2
       centeredSlides={false}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
       }}
       pagination={{
        clickable: true,
       }}
       navigation={true}
       modules={[Autoplay, Pagination, Navigation]}
       className="mySwiper"
       breakpoints={{
        // When window width is >= 640px
        640: {
         slidesPerView: 1, // Show 1 slide on small screens
         spaceBetween: 20,
        },
        // When window width is >= 768px
        768: {
         slidesPerView: 2, // Show 2 slides on medium screens
         spaceBetween: 30,
        },
        // When window width is >= 1024px
        1024: {
         slidesPerView: 2, // Show 2 slides on large screens
         spaceBetween: 30,
        },
       }}
      >
       {promos.map((promo) => {
        return (
         <SwiperSlide key={promo.id}>
          <div>
           <img src={promo.image} alt="" />
          </div>
         </SwiperSlide>
        );
       })}
      </Swiper>
     </Row>
    </Container>
   </div>

   {/* SHOWING NOW MOVIE SECTION */}
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
          <button
           className="btn btn-warning "
           onClick={() => navigate("/movie")}
          >
           Get Ticket
          </button>
         </div>
        </Card>
       </Col>
      ))}
     </Row>
    </Container>
   </div>

   {/* FAQ SECTION */}
   <FaqComponents />
  </div>
 );
};

export default HomePage;
