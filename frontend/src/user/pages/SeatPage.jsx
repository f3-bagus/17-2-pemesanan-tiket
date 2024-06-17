import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import seat_av from "../assets/img/seat/seat-av.png";
import seat_unav from "../assets/img/seat/seat-unav.png";
import seat_pick from "../assets/img/seat/seat-picked.png";
import "../css/main.css";

const seatsData = [
  // Row A
  { id: "A1", available: true }, { id: "A2", available: true },
  { id: "A3", available: true }, { id: "A4", available: true },
  { id: "A5", available: true }, { id: "A6", available: true },
  { id: "A7", available: true }, { id: "A8", available: true },
  { id: "A9", available: true }, { id: "A10", available: true },
  // Row B
  { id: "B1", available: true }, { id: "B2", available: true },
  { id: "B3", available: true }, { id: "B4", available: true },
  { id: "B5", available: true }, { id: "B6", available: true },
  { id: "B7", available: true }, { id: "B8", available: true },
  { id: "B9", available: true }, { id: "B10", available: true },
  // Row C
  { id: "C1", available: false }, { id: "C2", available: true },
  { id: "C3", available: true }, { id: "C4", available: true },
  { id: "C5", available: true }, { id: "C6", available: true },
  { id: "C7", available: true }, { id: "C8", available: true },
  { id: "C9", available: true }, { id: "C10", available: true },
  // Row D
  { id: "D1", available: true }, { id: "D2", available: true },
  { id: "D3", available: true }, { id: "D4", available: true },
  { id: "D5", available: true }, { id: "D6", available: true },
  { id: "D7", available: true }, { id: "D8", available: true },
  { id: "D9", available: true }, { id: "D10", available: true },
  // Row E
  { id: "E1", available: true }, { id: "E2", available: true },
  { id: "E3", available: true }, { id: "E4", available: true },
  { id: "E5", available: true }, { id: "E6", available: true },
  { id: "E7", available: true }, { id: "E8", available: true },
  { id: "E9", available: true }, { id: "E10", available: true },
  // Row F
  { id: "F1", available: true }, { id: "F2", available: true },
  { id: "F3", available: true }, { id: "F4", available: true },
  { id: "F5", available: true }, { id: "F6", available: true },
  { id: "F7", available: true }, { id: "F8", available: true },
  { id: "F9", available: true }, { id: "F10", available: true },
  // Row G
  { id: "G1", available: true }, { id: "G2", available: true },
  { id: "G3", available: true }, { id: "G4", available: true },
  { id: "G5", available: true }, { id: "G6", available: true },
  { id: "G7", available: true }, { id: "G8", available: true },
  { id: "G9", available: true }, { id: "G10", available: true },
];

const SeatPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const initialBalance = 500000;
  const [film, setFilm] = useState(null);

  let navigate = useNavigate();
  let { id } = useParams();
  const location = useLocation();
  const { movie } = location.state || {};

  console.log("Film data received in SeatPage:", movie);

  useEffect(() => {
    if (movie) {
      setFilm(movie);
    } else {
      const fetchFilm = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/films/${id}`);
          setFilm(response.data);
        } catch (error) {
          console.error("Error fetching film:", error);
        }
      };

      fetchFilm();
    }
  }, [id, movie]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceedToPayment = () => {
    navigate(`/payment/${id}`, { state: { selectedSeats, movie: film } });
  };

  const totalAmount = film ? film.price * selectedSeats.length : 0;
  const pricePerSeat = film ? film.price : 0;

  return (
    <div className="user-seat bg-light text-dark">
      <Container className="main-container min-vh-100 pb-5">
        <div className="back-button d-flex align-items-center mb-3">
          <Button
            variant="light"
            onClick={handleBack}
            style={{ border: "none", background: "none" }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Button>
          <h4 className="ml-2 mb-0">Choose Seats</h4>
        </div>
        <Row>
          <Col md="8">
            <div
              className="seat-selection-container p-3 mb-3"
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            >
              <div className="price-box p-2 mb-3">
                <h5 className="text-center mb-0">
                  Price/Seat : Rp {pricePerSeat.toFixed(2)}
                </h5>
              </div>
              <div className="screen-label text-center mb-3">
                <div className="screen"></div>
                <h5>SCREEN</h5>
              </div>
              <div className="seat-selection-box">
                {["A", "B", "C", "D", "E", "F", "G"].map((row) => (
                  <div className="seat-row" key={row}>
                    {seatsData
                      .filter((seat) => seat.id.startsWith(row))
                      .map((seat) => (
                        <Seat
                          key={seat.id}
                          seat={seat}
                          handleSeatClick={handleSeatClick}
                          selectedSeats={selectedSeats}
                        />
                      ))}
                  </div>
                ))}
                <div className="legend d-flex justify-content-center text-dark">
                  <div className="mx-2">
                    <Image src={seat_av} style={{ width: "20px" }} /> Available
                  </div>
                  <div className="mx-2">
                    <Image src={seat_unav} style={{ width: "20px" }} /> Unavailable
                  </div>
                  <div className="mx-2">
                    <Image src={seat_pick} style={{ width: "20px" }} /> Your Choice
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="movie-details p-3 border rounded mb-3 text-center text-dark">
              <Row>
                {film && (
                  <>
                    <Col>
                      <Image
                        className="rounded-3 w-50 mx-auto d-block"
                        src={`http://localhost:3000/uploads/members/${film.images[0].filename}`}
                        alt={film.title}
                        fluid
                      />
                      <h5 className="my-3 fw-bold">{film.name_film}</h5>
                      <hr></hr>
                      <p className="d-flex justify-content-between">
                        <strong>Cinema</strong> <span>CGV - Pakuwon Mall Jogja</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <strong>Date & Time</strong>{" "}
                        <span>Friday, 14 Jun 2024 - 19:25</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <strong>Studio</strong> <span>REGULAR</span>
                      </p>
                    </Col>
                  </>
                )}
              </Row>
              <hr />
              <div className="mt-2">
                <p className="d-flex justify-content-between">
                  <strong>Seat Number </strong>{" "}
                  <span>{selectedSeats.join(", ") || "No Seats Chosen"}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <strong>Seats Selected </strong> <span>{selectedSeats.length}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <strong>Total </strong> <span>Rp {totalAmount.toFixed(2)}</span>
                </p>
              </div>
              <Button
                className="btn btn-warning btn-lg mt-3"
                style={{ width: "100%" }}
                onClick={handleProceedToPayment}
                disabled={selectedSeats.length === 0}
              >
                Continue
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Seat = ({ seat, handleSeatClick, selectedSeats }) => {
  return (
    <div className="seat" style={{ textAlign: "center", marginRight: seat.id.endsWith("5") ? "30px" : "10px" }}>
      <Image
        src={
          selectedSeats.includes(seat.id)
            ? seat_pick
            : seat.available
            ? seat_av
            : seat_unav
        }
        onClick={() => seat.available && handleSeatClick(seat.id)}
        style={{
          cursor: seat.available ? "pointer" : "not-allowed",
          width: "35px",
          height: "35px",
        }}
        alt={`Seat ${seat.id}`}
      />
      <div>{seat.id}</div>
    </div>
  );
};

export default SeatPage;
