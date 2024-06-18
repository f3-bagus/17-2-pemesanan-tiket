import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/main.css";
import historykosong from "../assets/img/ticket/historykosong.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TicketPages = () => {
  let navigate = useNavigate();
  const [sortOption, setSortOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.film.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ticket-page-container">
      <Container className="ticket-page-ticket-container">
        <Row className="w-100 align-items-center justify-content-between">
          <Col>
            <div className="back-button d-flex align-items-center">
              <Button
                variant="light"
                onClick={handleBack}
                style={{ border: "none", background: "none" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <h2 className="ml-2 mb-0">MY TICKETS</h2>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center mr-3 ticket-page-sort-container">
              <span className="ticket-page-sort-by-text">Sort By</span>
              <Form.Select
                value={sortOption}
                onChange={handleSortChange}
                className="ticket-page-sort-dropdown"
              >
                <option value="latest">Latest</option>
                <option value="newest">Newest</option>
              </Form.Select>
            </div>
            <div className="ticket-page-search-bar">
              <FormControl
                placeholder="Search tickets..."
                aria-label="Search tickets"
                aria-describedby="search-tickets"
                value={searchQuery}
                onChange={handleSearchChange}
                className="ticket-page-search-input"
              />
              <InputGroup.Text
                id="search-tickets"
                className="ticket-page-search-icon"
              >
                <FontAwesomeIcon icon={faSearch} className="ticket-page-fa-search" />
              </InputGroup.Text>
            </div>
          </Col>
        </Row>
        {loading ? (
          <Row className="text-center mt-4">
            <Col>Loading...</Col>
          </Row>
        ) : filteredTickets.length > 0 ? (
          <Row className="text-center mt-4">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Film</th>
                    <th>Seat</th>
                    <th>Showtime</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, index) => (
                    <tr key={ticket._id}>
                      <td>{index + 1}</td>
                      <td>{ticket.film}</td>
                      <td>{ticket.seat}</td>
                      <td>{ticket.showtime}</td>
                      <td>{ticket.ticketPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <Row className="text-center mt-4">
            <Col>
              <div className="ticket-page-ticket-empty">
                <img
                  src={historykosong}
                  alt="No tickets"
                  className="ticket-page-ticket-image"
                />
                <p className="ticket-page-ticket-text">
                  Looks like you haven't booked any ticket yet.
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default TicketPages;