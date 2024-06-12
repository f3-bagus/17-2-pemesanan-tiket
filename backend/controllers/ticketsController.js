const Ticket = require("../models/TicketModel");

const getAllTicket = async (req, res) => {
  const tickets = await Ticket.find({});
  return res.status(200).json(tickets);
};

module.exports = { getAllTicket };
