import { Accordion, Container, Row, Col } from "react-bootstrap";

const FaqComponent = () => {
 return (
  <div className="faq">
   <Container>
    <Row>
     <Col>
      <h2 className="fw-bold text-center">Frequently Asked Questions</h2>
     </Col>
    </Row>
    <Row className="row-cols-lg-2 row-cols-1 g-4 pt-5">
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="0">
        <Accordion.Header>What is FlickBox?</Accordion.Header>
        <Accordion.Body>
         FlickBox is an online platform that allows you to book movie tickets
         easily and conveniently from your computer or mobile device.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="1">
        <Accordion.Header>
         How do I create an account on FlickBox?
        </Accordion.Header>
        <Accordion.Body>
         To create an account, click on the "Sign Up" button on the top right
         corner of the homepage. Fill in the required details and follow the
         instructions to complete the registration process.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="2">
        <Accordion.Header>
         How do I know if my booking was successful?
        </Accordion.Header>
        <Accordion.Body>
         After completing the payment, you can check the status of your booking
         under "My Ticket" in your FlickBox account.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="3">
        <Accordion.Header>
         How do I create an account on FlickBox?
        </Accordion.Header>
        <Accordion.Body>
         To create an account, click on the "Sign Up" button on the top right
         corner of the homepage. Fill in the required details and follow the
         instructions to complete the registration process.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="4">
        <Accordion.Header>
         How do I book a movie ticket on FlickBox?
        </Accordion.Header>
        <Accordion.Body>
         1. Log in to your FlickBox account. 2. Browse through the list of
         movies or use the search bar to find your desired movie. 3. Select the
         movie, showtime, and seat(s). 4. Proceed to checkout and make the
         payment. 5. You will receive a confirmation email and your e-ticket.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="5">
        <Accordion.Header>
         Can I choose my seat while booking tickets?
        </Accordion.Header>
        <Accordion.Body>
         Yes, FlickBox allows you to choose your preferred seats while booking
         tickets. Simply click on the available seats shown in the seating
         layout during the booking process.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="6">
        <Accordion.Header>
         What payment methods are accepted on FlickBox?
        </Accordion.Header>
        <Accordion.Body>
         FlickBox accepts various payment methods including credit/debit cards,
         digital wallets, and net banking.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
     <Col>
      <Accordion className="shadow-sm">
       <Accordion.Item eventKey="7">
        <Accordion.Header>
         Is it safe to make payments on FlickBox?
        </Accordion.Header>
        <Accordion.Body>
         Yes, FlickBox uses secure payment gateways and advanced encryption
         technologies to ensure that your transactions are safe and secure.
        </Accordion.Body>
       </Accordion.Item>
      </Accordion>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default FaqComponent;
