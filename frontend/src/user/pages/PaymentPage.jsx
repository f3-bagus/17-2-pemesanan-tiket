import React, { useState, useEffect } from "react";
import {
 Container,
 Row,
 Col,
 Card,
 Button,
 Alert,
 Image,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

const PaymentPage = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { selectedSeats, time } = location.state || {
  selectedSeats: [],
  time: "19:25",
 };
 const { id } = useParams();

 const [film, setFilm] = useState(null);
 const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
 const [balance, setBalance] = useState(0);

 useEffect(() => {
  const fetchFilm = async () => {
   console.log("Fetching film with id:", id);
   try {
    const response = await axios.get(`http://localhost:3000/api/films/${id}`);
    console.log("API response:", response.data);
    setFilm(response.data);
   } catch (error) {
    console.error("Error fetching film:", error);
   }
  };

  const fetchUserProfile = async () => {
   const token = sessionStorage.getItem("token");
   if (!token) {
    console.error("No token found in session storage.");
    return;
   }

   try {
    const response = await axios.get("http://localhost:3000/api/profile", {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });
    console.log("User profile response:", response.data);
    setBalance(response.data.saldo);
   } catch (error) {
    console.error("Error fetching user profile:", error);
   }
  };

  fetchFilm();
  fetchUserProfile();
 }, [id]);

 if (!film) return <div>Loading...</div>;

 const totalAmount = film.price * selectedSeats.length;
 const totalPrice = parseFloat(totalAmount.toFixed(2));

 const handlePayment = async () => {
  if (balance >= totalPrice) {
   const orderData = {
    filmId: film._id,
    customer: "Alaska",
    date: moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
    time: time,
    seatId: selectedSeats,
    totalPrice: totalPrice,
   };

   console.log("Order data being sent:", orderData);

   try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
     `http://localhost:3000/api/films/${id}/order`,
     orderData,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    console.log("Order response:", response.data);

    setBalance(balance - totalPrice);
    setIsPaymentSuccessful(true);
   } catch (error) {
    console.error("Error processing order:", error);
    alert("Terjadi kesalahan saat memproses pembayaran.");
   }
  } else {
   alert("Saldo tidak mencukupi.");
  }
 };

 const handleBack = () => {
  navigate(-1);
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
      <Card className="bg-light">
       <Card.Body>
        <h5 className="pb-3 fs-5">Movie Detail</h5>
        <Row>
         <Col md="4">
          <Image
           className="rounded-3"
           src={`http://localhost:3000/uploads/members/${film.images[0].filename}`}
           fluid
          />
         </Col>
         <Col md="8">
          <div>
           <h3>
            <strong>{film.name_film}</strong>
           </h3>
           <p className="d-flex justify-content-between">
            <strong>Cinema</strong> <span>CGV - Pakuwon Mall Jogja</span>
           </p>
           <p className="d-flex justify-content-between">
            <strong>Date & Time</strong>{" "}
            <span>{`Friday, 14 Jun 2024 - ${time}`}</span>
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
        <h5 className="pb-3 fs-5">Payment Detail</h5>
        <div>
         <p className="d-flex justify-content-between">
          <strong>Ticket price</strong> <span>Rp {totalAmount.toFixed(2)}</span>
         </p>
         <p className="d-flex justify-content-between">
          <strong>Admin Fee</strong> <span>Free</span>
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
          className="btn btn-warning btn-lg mt-3 fs-6 fw-semibold"
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
