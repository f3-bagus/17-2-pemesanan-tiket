import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SeatPage = () => {
 let navigate = useNavigate();

 return (
  <div className="user-seat">
   <Container className="min-vh-100">
    <Row>
     <Col>
      <button
       className="btn btn-dark btn-lg rounded-1 me-2 mb-xs-0 mb-2"
       onClick={() => navigate("/payment")}
      >
       Buy Ticket
      </button>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default SeatPage;
