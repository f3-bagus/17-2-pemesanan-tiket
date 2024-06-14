// src/pages/SeatPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import seat_av from "../assets/img/seat/seat-av.png";
import seat_unav from "../assets/img/seat/seat-unav.png";
import seat_pick from "../assets/img/seat/seat-picked.png";

const seatsData = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

const SeatPage = () => {
 const [selectedSeats, setSelectedSeats] = useState([]);
 let navigate = useNavigate();

 const handleSeatClick = (seat) => {
  if (selectedSeats.includes(seat)) {
   setSelectedSeats(selectedSeats.filter((s) => s !== seat));
  } else {
   setSelectedSeats([...selectedSeats, seat]);
  }
 };

 const handleProceedToPayment = () => {
  navigate("/payment", { state: { selectedSeats } });
 };

 return (
  <div className="user-seat">
   <Container className="min-vh-100 pb-5">
    <Row className="justify-content-md-center">
     <Col md="8">
      <h2>Select Your Seat</h2>
      <div className="d-flex flex-wrap">
       {seatsData.map((seat, index) => (
        <div key={index} className="m-1" style={{ textAlign: "center" }}>
         <Image
          src={selectedSeats.includes(seat) ? seat_pick : seat_av}
          onClick={() => handleSeatClick(seat)}
          style={{ cursor: "pointer", width: "35px", height: "35px" }}
          alt={`Seat ${seat}`}
         />
         <div>{seat}</div>
        </div>
       ))}
      </div>
      <Button
       variant="primary"
       className="mt-3"
       onClick={handleProceedToPayment}
       disabled={selectedSeats.length === 0}
      >
       Proceed to Payment
      </Button>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default SeatPage;
