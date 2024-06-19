const Booking = require("../models/BookingModel");
const Ticket = require('../models/TicketModel');
const Seat = require("../models/SeatModel");

const getBookingOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ filmId: id }).populate("filmId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const seatNumber = booking.seats.map((seat) => `${seat.rows} - ${seat.number}`);
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
    const order = await Booking.findOne({ filmId: id, hasTicket: false }).populate("filmId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const totalPrice = order.totalPrice;
    let userBalance = req.user.balance;

    // Validasi bahwa userBalance dan totalPrice adalah angka
    if (isNaN(userBalance)) {
      console.error("Invalid user balance: ", userBalance);
      return res.status(400).json({ message: "Invalid user balance" });
    }
    if (isNaN(totalPrice)) {
      console.error("Invalid total price: ", totalPrice);
      return res.status(400).json({ message: "Invalid total price" });
    }

    console.log("User balance before deduction:", userBalance);

    if (userBalance < totalPrice) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const newBalance = userBalance - totalPrice;

    // Pastikan newBalance adalah angka
    if (isNaN(newBalance)) {
      console.error("Calculation error in new balance:", newBalance);
      return res.status(400).json({ message: "Calculation error in new balance" });
    }

    console.log("New balance after deduction:", newBalance);

    req.user.balance = newBalance;

    await req.user.save();

    // Save seats to Seat model
    for (const seat of order.seats) {
      const newSeat = new Seat({
        rows: seat.rows,
        number: seat.number,
        bookingId: order._id,
      });
      await newSeat.save();
    }

    // Create tickets
    const tickets = [];
    for (const seat of order.seats) {
      const newTicket = new Ticket({
        costumer: req.user.username,
        seat: `${seat.rows}-${seat.number}`,
        film: order.filmId.name_film,
        showtime: `${order.date}-${order.time}`,
      });
      tickets.push(await newTicket.save());
    }

    // Update booking to mark it as having a ticket
    order.hasTicket = true;
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      tickets,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating Order", error });
  }
};


module.exports = { createBookingOrder, getBookingOrderByUser };
