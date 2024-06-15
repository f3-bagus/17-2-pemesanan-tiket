const Booking = require("../models/BookingModel");
const Ticket = require('../models/TicketModel')

const getBookingOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ filmId: id }).populate(
      "filmId seatId"
    );
    const seatNumber = booking.seatId.seats.map(
      (seat) => `${seat.rows}-${seat.number}`
    );
    // console.log(seat);
    return res.status(200).json({
      movieDetail: {
        film: booking.filmId.name_film,
        "Date & Time": `${booking.date}-${booking.time}`,
        seat: seatNumber,
      },
      paymentDetail: {
        ticketPrice: booking.totalPrice,
        adminFee: 0,
        totalPrice: booking.totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createBookingOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Booking.findOne({ filmId: id }).populate("filmId seatId");
    const totalPrice = order.totalPrice;
    const userBalance = req.user.balance;
    if (userBalance < totalPrice) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    const newBalance = userBalance - totalPrice;
    req.user.balance = newBalance;
    await req.user.save();

    
    const seats = order.seatId.seats.map(
      (seat) => `${seat.rows}-${seat.number}`
    );
    // console.log(seats);
    const tickets = [];
    for (const seat of seats) {
      const newTicket = new Ticket({
        user: req.user.username,
        seat: seat,
        film: order.name_film,
        "Date & Time": `${order.date}-${order.time}`,
      });
      tickets.push(await newTicket.save());
    }
    res.status(201).json({
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating Order", error });
  }
};

module.exports = { createBookingOrder, getBookingOrderByUser };
