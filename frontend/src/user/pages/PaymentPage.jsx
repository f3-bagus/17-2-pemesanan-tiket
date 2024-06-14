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
} from "react-bootstrap";
import { posterMovies } from "../data/index";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { selectedSeats } = location.state || { selectedSeats: [] };
 const initialBalance = 500000;
 const user = {
  name: "Alaska",
  balance: initialBalance,
 };

 const movieId = 1; // Ganti dengan ID yang ingin diambil
 const movie = posterMovies.find((m) => m.id === movieId);

 const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
 const [balance, setBalance] = useState(user.balance);

 const totalAmount = movie.price * selectedSeats.length;
 const totalPrice = totalAmount + 1;

 const handlePayment = () => {
  if (balance >= totalPrice) {
   setBalance(balance - totalPrice);
   setIsPaymentSuccessful(true);
   // Kurangi saldo pengguna (logika backend seharusnya di sini)
  } else {
   alert("Saldo tidak mencukupi.");
  }
 };

 const handleBack = () => {
  navigate(-1); // Go back to the previous page
 };

 return (
  <div className="user-payment">
   <Container className="pb-5">
    <div className="back-button d-flex align-items-center mb-3">
     <Button
      variant="light"
      onClick={handleBack}
      style={{ border: "none", background: "none" }}
     >
      <i className="fa-solid fa-arrow-left"></i>
     </Button>
     <h4 className="ml-2 mb-0">Order Summary</h4>
    </div>
    <Row className="justify-content-md-center">
     <Col md="6">
      <Card>
       <Card.Body>
        <h5 className="pb-3">Movie Detail</h5>
        <Row>
         <Col md="4">
          <Image className="rounded-3" src={movie.image} fluid />
         </Col>
         <Col md="8">
          <div>
           <h4>
            <strong>{movie.title}</strong>
           </h4>
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
           <p className="d-flex justify-content-between">
            <strong>Seats</strong> <span>{selectedSeats.join(", ")}</span>
           </p>
          </div>
         </Col>
        </Row>
        <br />
        <h5 className="pb-3">Payment Detail</h5>
        <div>
         <p className="d-flex justify-content-between">
          <strong>Ticket price</strong> <span>Rp {totalAmount.toFixed(2)}</span>
         </p>
         <p className="d-flex justify-content-between">
          <strong>Admin Fee</strong> <span>Free</span>
         </p>
         <p className="d-flex justify-content-between">
          <strong>Convenience fee</strong> <span>Rp 1</span>
         </p>
         <hr />
         <p className="d-flex justify-content-between">
          <strong>Total</strong> <span>Rp {totalPrice.toFixed(2)}</span>
         </p>
         <p className="d-flex justify-content-between">
          <strong>Balance</strong> <span>Rp {balance.toFixed(2)}</span>
         </p>
        </div>
        {isPaymentSuccessful ? (
         <>
          <Alert variant="success" className="mt-3">
           Pembayaran Berhasil!
          </Alert>
          <p className="d-flex justify-content-between">
           <strong>Remaining Balance</strong>{" "}
           <span>Rp {balance.toFixed(2)}</span>
          </p>
         </>
        ) : (
         <Button
          className="btn btn-warning btn-lg mt-3"
          style={{ width: "100%" }}
          onClick={handlePayment}
         >
          Pay Now
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
