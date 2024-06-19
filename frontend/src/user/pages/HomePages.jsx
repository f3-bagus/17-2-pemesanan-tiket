import { Container, Col, Row, Card, Modal } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import HeroImage from "../assets/img/hero/hero1.png";
import FaqComponents from "../components/FaqComponent";
import { useNavigate } from "react-router-dom";
import { promos } from "../data/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HomePage = () => {
 let navigate = useNavigate();
 const showingNowRef = useRef(null);

 const [films, setFilms] = useState([]);
 const [show, setShow] = useState(false);
 const [selectedFilm, setSelectedFilm] = useState(null);

 const handleShow = (film) => {
  setSelectedFilm(film);
  setShow(true);
 };

 const handleClose = () => setShow(false);

 const scrollToShowingNow = () => {
  showingNowRef.current.scrollIntoView({ behavior: "smooth" });
 };

 useEffect(() => {
  const fetchFilms = async () => {
   try {
    const response = await axios.get("http://localhost:5750/api/films");
    setFilms(response.data);
   } catch (error) {
    console.error("Error fetching films:", error);
   }
  };

  fetchFilms();
 }, []);

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
       <button
        className="btn padding-btn-lg btn-light fs-6 fw-medium rounded-2 me-2 mb-xs-0 mb-2"
        onClick={scrollToShowingNow}
       >
        Buy Ticket
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
     <Row className="py-5">
      <Swiper
       spaceBetween={30}
       slidesPerView={2} // This sets the number of slides visible to 2
       centeredSlides={false}
       loop={true}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
       }}
       pagination={{
        clickable: true,
       }}
       navigation={false}
       modules={[Autoplay, Pagination, Navigation]}
       className="mySwiper"
       breakpoints={{
        // When window width is >= 640px
        0: {
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
   <div className="movies w-100 min-vh-100" ref={showingNowRef}>
    <Container>
     <Row>
      <Col>
       <h1 className="fw-bold pt-3">Showing Now</h1>
      </Col>
     </Row>
     <Row>
      {films.map((film) => (
       <Col key={film._id} className="position-relative movie-poster">
        <Card className="mb-4 rounded-4">
         <Card.Img
          variant="top"
          src={`http://localhost:5750/uploads/members/${film.images[0].filename}`}
          alt="poster-film"
          className="film-poster w-100 rounded-4"
         />
         <div className="overlay rounded-4">
          <button
           className="trailer btn-light rounded-2 mb-2"
           onClick={() => handleShow(film)}
          >
           Watch Trailer
          </button>
          <button
           className="btn-orange rounded-2"
           onClick={() => navigate(`/movie/${film._id}`)} // Navigate to MoviePage with the film ID
          >
           Get Ticket
          </button>
         </div>
        </Card>
       </Col>
      ))}
     </Row>
     {/* Trailer Modal */}
     <Modal
      show={show}
      onHide={handleClose}
      size="md"
      className="user-modal-trailer"
      centered
     >
      <Modal.Header className="user-modal-header" closeButton></Modal.Header>
      <Modal.Body className="user-modal-body">
       {selectedFilm && (
        <div className="user-modal-content embed-responsive embed-responsive-16by9">
         <iframe
          className="embed-responsive-item"
          src={`http://www.youtube.com/embed/${selectedFilm.linkTrailer}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
         ></iframe>
        </div>
       )}
      </Modal.Body>
     </Modal>
    </Container>
   </div>

   {/* FAQ SECTION */}
   <FaqComponents />
  </div>
 );
};

export default HomePage;
