const Ticket = require('../models/Ticket');

const getAllTicket = async (req, res) => {
    const tickets = await Ticket.find({});
    return res.status(200).json(tickets)
};

module.exports = { getAllTicket}