const Ticket = require("../models/TicketModel");

const getTicketByUser = async (req, res) => {
  const tickets = await Ticket.find({costumer: req.user.username});
  return res.status(200).json(tickets);
};

const getAllTicket = async (req, res) => {
  const allTickets = await Ticket.find({});
  return res.status(200).json(allTickets);
}


module.exports = { getTicketByUser, getAllTicket };
