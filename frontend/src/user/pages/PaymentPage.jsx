import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useState } from "react";

const PaymentPage = () => {
 const user = {
  name: "Alaska",
  balance: 50000,
  ticketPrice: 30000,
 };
 const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

 const handlePayment = () => {
  if (user.balance >= user.ticketPrice) {
   setIsPaymentSuccessful(true);
   // Kurangi saldo pengguna (logika backend seharusnya di sini)
  } else {
   alert("Saldo tidak mencukupi.");
  }
 };

 return (
  <div className="user-payment">
   <Container className="min-vh-100">
    <Row className="justify-content-md-center">
     <Col md="6">
      <Card>
       <Card.Header>Payment</Card.Header>
       <Card.Body>
        <Card.Title>Konfirmasi Pembayaran</Card.Title>
        <Card.Text>
         <strong>Nama Pengguna: </strong> {user.name}
        </Card.Text>
        <Card.Text>
         <strong>Saldo Saat Ini: </strong> Rp {user.balance.toFixed(2)}
        </Card.Text>
        <Card.Text>
         <strong>Harga Tiket: </strong> Rp {user.ticketPrice.toFixed(2)}
        </Card.Text>
        {isPaymentSuccessful ? (
         <Alert variant="success">Pembayaran Berhasil!</Alert>
        ) : (
         <Button variant="primary" onClick={handlePayment}>
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
