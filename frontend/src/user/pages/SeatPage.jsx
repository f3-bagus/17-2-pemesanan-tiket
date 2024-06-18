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
  { id: "A1", rows: "A", number: 1, available: true },
  { id: "A2", rows: "A", number: 2, available: true },
  { id: "A3", rows: "A", number: 3, available: true },
  { id: "A4", rows: "A", number: 4, available: true },
  { id: "A5", rows: "A", number: 5, available: true },
  { id: "A6", rows: "A", number: 6, available: true },
  { id: "A7", rows: "A", number: 7, available: true },
  { id: "A8", rows: "A", number: 8, available: true },
  { id: "A9", rows: "A", number: 9, available: true },
  { id: "A10", rows: "A", number: 10, available: true },
  // Row B
  { id: "B1", rows: "B", number: 1, available: true },
  { id: "B2", rows: "B", number: 2, available: true },
  { id: "B3", rows: "B", number: 3, available: true },
  { id: "B4", rows: "B", number: 4, available: true },
  { id: "B5", rows: "B", number: 5, available: true },
  { id: "B6", rows: "B", number: 6, available: true },
  { id: "B7", rows: "B", number: 7, available: true },
  { id: "B8", rows: "B", number: 8, available: true },
  { id: "B9", rows: "B", number: 9, available: true },
  { id: "B10", rows: "B", number: 10, available: true },
  // Row C
  { id: "C1", rows: "C", number: 1, available: true },
  { id: "C2", rows: "C", number: 2, available: true },
  { id: "C3", rows: "C", number: 3, available: true },
  { id: "C4", rows: "C", number: 4, available: true },
  { id: "C5", rows: "C", number: 5, available: true },
  { id: "C6", rows: "C", number: 6, available: true },
  { id: "C7", rows: "C", number: 7, available: true },
  { id: "C8", rows: "C", number: 8, available: true },
  { id: "C9", rows: "C", number: 9, available: true },
  { id: "C10", rows: "C", number: 10, available: true },
  // Row D
  { id: "D1", rows: "D", number: 1, available: true },
  { id: "D2", rows: "D", number: 2, available: true },
  { id: "D3", rows: "D", number: 3, available: true },
  { id: "D4", rows: "D", number: 4, available: true },
  { id: "D5", rows: "D", number: 5, available: true },
  { id: "D6", rows: "D", number: 6, available: true },
  { id: "D7", rows: "D", number: 7, available: true },
  { id: "D8", rows: "D", number: 8, available: true },
  { id: "D9", rows: "D", number: 9, available: true },
  { id: "D10", rows: "D", number: 10, available: true },
  // Row E
  { id: "E1", rows: "E", number: 1, available: true },
  { id: "E2", rows: "E", number: 2, available: true },
  { id: "E3", rows: "E", number: 3, available: true },
  { id: "E4", rows: "E", number: 4, available: true },
  { id: "E5", rows: "E", number: 5, available: true },
  { id: "E6", rows: "E", number: 6, available: true },
  { id: "E7", rows: "E", number: 7, available: true },
  { id: "E8", rows: "E", number: 8, available: true },
  { id: "E9", rows: "E", number: 9, available: true },
  { id: "E10", rows: "E", number: 10, available: true },
  // Row F
  { id: "F1", rows: "F", number: 1, available: true },
  { id: "F2", rows: "F", number: 2, available: true },
  { id: "F3", rows: "F", number: 3, available: true },
  { id: "F4", rows: "F", number: 4, available: true },
  { id: "F5", rows: "F", number: 5, available: true },
  { id: "F6", rows: "F", number: 6, available: true },
  { id: "F7", rows: "F", number: 7, available: true },
  { id: "F8", rows: "F", number: 8, available: true },
  { id: "F9", rows: "F", number: 9, available: true },
  { id: "F10", rows: "F", number: 10, available: true },
  // Row G
  { id: "G1", rows: "G", number: 1, available: true },
  { id: "G2", rows: "G", number: 2, available: true },
  { id: "G3", rows: "G", number: 3, available: true },
  { id: "G4", rows: "G", number: 4, available: true },
  { id: "G5", rows: "G", number: 5, available: true },
  { id: "G6", rows: "G", number: 6, available: true },
  { id: "G7", rows: "G", number: 7, available: true },
  { id: "G8", rows: "G", number: 8, available: true },
  { id: "G9", rows: "G", number: 9, available: true },
  { id: "G10", rows: "G", number: 10, available: true },
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

  const handleProceedToPayment = async () => {
    try {
      const token = sessionStorage.getItem("token");
  
      // Buat array baru yang hanya berisi rows dan number dari selectedSeats
      const selectedSeatsData = selectedSeats.map((seatId) => {
        const seat = seatsData.find((s) => s.id === seatId);
        return { rows: seat.rows, number: seat.number };
      });
  
      // Kirim data ke backend
      await axios.post(
        `http://localhost:3000/api/films/${id}/seat-picker`,
        { seats: selectedSeatsData }, // Ubah objek yang dikirim menjadi objek dengan properti seats
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate(`/payment/${id}`, { state: { selectedSeats, movie: film } });
    } catch (error) {
      console.error("Error sending seat data:", error);
    }
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
                      .filter((seat) => seat.rows === row)
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
