const Ticket = require("../models/TicketModel");

const getAllTicket = async (req, res) => {
  const tickets = await Ticket.find({costumer: req.user.username});
  return res.status(200).json(tickets);
};

module.exports = { getAllTicket };
