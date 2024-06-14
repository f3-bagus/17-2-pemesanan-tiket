// src/components/PaymentPage.jsx
import React, { useState } from "react";
import {
 Container,
 Row,
 Col,
 Card,
 Button,
 Alert,
 Image,
 ListGroup,
} from "react-bootstrap";
import { posterMovies } from "../data/index";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
 const location = useLocation();
 const { selectedSeats } = location.state || { selectedSeats: [] };
 const user = {
  name: "Alaska",
  balance: 50000,
 };

 const movieId = 1; // Ganti dengan ID yang ingin diambil
 const movie = posterMovies.find((m) => m.id === movieId);

 const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

 const handlePayment = () => {
  const totalAmount = movie.price;
  if (user.balance >= totalAmount) {
   setIsPaymentSuccessful(true);
   // Kurangi saldo pengguna (logika backend seharusnya di sini)
  } else {
   alert("Saldo tidak mencukupi.");
  }
 };

 return (
  <div className="user-payment">
   <Container className="pb-5">
    <Row className="justify-content-md-center">
     <Col md="8">
      <Card>
       <Card.Body>
        <Card.Title>Movie Detail</Card.Title>
        <Row>
         <Col md="4">
          <Image src={movie.image} fluid />
         </Col>
         <Col md="8">
          <ListGroup variant="flush">
           <ListGroup.Item>
            <strong>{movie.title}</strong>
           </ListGroup.Item>
           <ListGroup.Item>
            <strong>Cinema </strong> CGV - 23 Paskal Shopping Center
           </ListGroup.Item>
           <ListGroup.Item>
            <strong>Date & Time </strong> Friday, 14 Jun 2024 - 19:25
           </ListGroup.Item>
           <ListGroup.Item>
            <strong>Studio </strong> REGULAR
           </ListGroup.Item>
           <ListGroup.Item>
            <strong>Seats </strong> <br />
            {selectedSeats.join(", ")}
           </ListGroup.Item>
          </ListGroup>
         </Col>
        </Row>
        <hr />
        <Card.Title>Payment Detail</Card.Title>
        <ListGroup variant="flush">
         <ListGroup.Item>
          <strong>Ticket price:</strong> Rp{movie.price.toFixed(3)}
         </ListGroup.Item>
         <ListGroup.Item>
          <strong>Convenience fee:</strong> Rp1
         </ListGroup.Item>
         <ListGroup.Item>
          <strong>Admin Fee:</strong> Free
         </ListGroup.Item>
         <ListGroup.Item>
          <strong>Total:</strong> Rp{(movie.price + 1).toFixed(3)}
         </ListGroup.Item>
        </ListGroup>
        {isPaymentSuccessful ? (
         <Alert variant="success" className="mt-3">
          Pembayaran Berhasil!
         </Alert>
        ) : (
         <Button variant="primary" className="mt-3" onClick={handlePayment}>
          Bayar Sekarang
         </Button>
        )}
       </Card.Body>
      </Card>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default PaymentPage;
