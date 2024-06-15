import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { posterMovies } from "../data/index";
import seat_av from "../assets/img/seat/seat-av.png";
import seat_unav from "../assets/img/seat/seat-unav.png";
import seat_pick from "../assets/img/seat/seat-picked.png";
import "../css/main.css";

const seatsData = [
    { id: "A1", available: true },
    { id: "A2", available: true },
    { id: "A3", available: true },
    { id: "B1", available: true },
    { id: "B2", available: true },
    { id: "B3", available: true },
    { id: "C1", available: false },
    { id: "C2", available: true },
    { id: "C3", available: true },
    { id: "D1", available: true },
    { id: "D2", available: true },
    { id: "D3", available: true },
    { id: "E1", available: true },
    { id: "E2", available: true },
    { id: "E3", available: true },
    // Add more seats as necessary
];

const SeatPage = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const initialBalance = 500000;
    const [balance, setBalance] = useState(initialBalance);
    let navigate = useNavigate();
    let location = useLocation();
    const { movie } = location.state || {};

    const movieId = 1; // Replace with the actual movie ID
    const selectedMovie = posterMovies.find((m) => m.id === movieId);

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
        navigate("/payment", { state: { selectedSeats, movie } });
    };

    const totalAmount = selectedMovie?.price * selectedSeats.length || 0;
    const pricePerSeat = selectedMovie ? selectedMovie.price : 0;

    return (
        <div className="user-seat">
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
                        <div className="seat-selection-container p-3 mb-3" style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
                            <div className="price-box p-2 mb-3">
                                <h5 className="text-center mb-0">Price/Seat : Rp {pricePerSeat.toFixed(2)}</h5>
                            </div>
                            <div className="screen-label text-center mb-3">
                                <div className="screen"></div>
                                <h5>SCREEN</h5>
                            </div>
                            <div className="seat-selection-box">
                                <div className="d-flex flex-wrap justify-content-center mb-3">
                                    {seatsData.map((seat, index) => (
                                        <div key={index} className="m-1" style={{ textAlign: "center" }}>
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
                                    ))}
                                </div>
                                <div className="legend d-flex justify-content-center">
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
                        <div className="movie-details p-3 border rounded mb-3">
                            {selectedMovie && (
                                <>
                                    <Image src={selectedMovie.image} alt={selectedMovie.title} fluid />
                                    <h5 className="mt-2">{selectedMovie.title}</h5>
                                    <p>
                                        Cinema: {selectedMovie.cinema} <br />
                                        Date & Time: {selectedMovie.dateTime} <br />
                                        Studio: {selectedMovie.studio}
                                    </p>
                                </>
                            )}
                            <div className="mt-2">
                                <p>
                                    <strong>Seat Number:</strong> {selectedSeats.join(", ") || "No Seats Chosen"}
                                </p>
                                <p>
                                    <strong>Seats Selected:</strong> {selectedSeats.length}
                                </p>
                                <p>
                                    <strong>Total:</strong> Rp{totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <Button
                            className="btn btn-warning btn-lg mt-3"
                            style={{ width: "100%" }}
                            onClick={handleProceedToPayment}
                            disabled={selectedSeats.length === 0}
                        >
                            Continue
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SeatPage;