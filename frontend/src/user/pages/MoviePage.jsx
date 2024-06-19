import React, { useState, useEffect } from "react";
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
  const [show, setShow] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleShow = (film) => {
    setSelectedFilm(film);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleNavigateToSeatPage = async (movieId, time) => {
    console.log("Navigating to SeatPage with movieId:", movieId);
    console.log("Film object being passed:", film);

    const date = getFormattedDate(); // Getting the formatted date
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Log date and time before sending request
      console.log("Date to be sent:", date);
      console.log("Time to be sent:", time);

      const response = await axios.post(
        `http://localhost:5750/api/films/${movieId}`,
        { date, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Jika berhasil, arahkan ke halaman pemilihan kursi
      navigate(`/seats/${movieId}`, { state: { movie: film, time: time } });
    } catch (error) {
      console.error("Error verifying user profile:", error);

      // Jika gagal, arahkan ke halaman login
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`http://localhost:5750/api/films/${id}`);
        console.log("Fetched film data:", response.data);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };

    fetchFilm();
  }, [id]);

  if (!film) return <div>Loading...</div>;

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const dates = [getFormattedDate()];
  const times = ["12:10", "14:25", "16:40", "17:15", "18:55"];

  return (
    <div className="user-movie">
      {/* MOVIE DETAILS */}
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
            <Card className="poster-card rounded-4">
              <Card.Img
                className="w-100 rounded-4"
                variant="top"
                src={`http://localhost:5750/uploads/members/${film.images[0].filename}`}
                alt={film.name_film}
              />
            </Card>
            <div className="d-grid pt-3">
              <button
                className="btn-trailer-movie btn-dark rounded-2 fs-7 mb-xs-0 mb-2"
                onClick={() => handleShow(film)}
              >
                Watch trailer
              </button>
            </div>
          </Col>
          <Col md={6}>
            <h2 className="fw-bold">{film.name_film}</h2>
            <h5>{film.genre}</h5>
            <div className="icon-duration">
              <i className="fa-regular fa-clock"></i>
              <h6>{film.duration} Mins</h6>
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
            <p className="mv-cast">
              <strong>Cast</strong> <br />
              {film.cast}
            </p>
            <p className="mv-synopsis">
              <strong>Synopsis</strong> <br />
              {film.synopsis}
            </p>
          </Col>
        </Row>

        {/* TIME PICKER */}
        <Row className="justify-content-md-center">
          <Col md={9}>
            <h3 className="fw-bold pt-4">Available Tickets</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center pt-2 pb-5">
          {dates.map((date, index) => (
            <Accordion key={index} defaultActiveKey="0" className="w-75 pb-3">
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{date}</Accordion.Header>
                <Accordion.Body>
                  {times.map((time, timeIndex) => (
                    <button
                      className="btn-jam m-1 rounded-2"
                      onClick={() => handleNavigateToSeatPage(id, time)}
                      key={timeIndex}
                    >
                      {time}
                    </button>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
  );
};

export default MoviePage;
