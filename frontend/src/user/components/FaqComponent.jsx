import { Accordion, Container, Row, Col } from "react-bootstrap";
import { faq } from "../data/index";

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
     {faq.map((data) => {
      return (
       <Col key={data.id}>
        <Accordion className="shadow-sm">
         <Accordion.Item eventKey={data.eventKey}>
          <Accordion.Header>{data.title}</Accordion.Header>
          <Accordion.Body>{data.desc}</Accordion.Body>
         </Accordion.Item>
        </Accordion>
       </Col>
      );
     })}
    </Row>
   </Container>
  </div>
 );
};

export default FaqComponent;
