const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");

const createNewPayment = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const booking = await Booking.findById(bookingId)
        .populate("filmId")
        .populate("scheduleId")
        .populate("seatId");
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      const totalPrice = booking.totalPrice;
      const userBalance = req.user.balance;
      
      if (userBalance < totalPrice) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      const newBalance = userBalance - totalPrice;
  
      req.user.balance = newBalance;
      await req.user.save();
  
      const payment = new Payment({
        balanceUser: newBalance,
        user: req.user.username,
        bookingId: booking._id
      });
      await payment.save();
  
      const film = booking.filmId;
      const seatObject = booking.seatId;
      const seats = seatObject.seats.map(seat => ({
        rows: seat.rows,
        number: seat.number,
      }));
  
      const tickets = [];
      for (const seat of seats) {
        const newTicket = new Ticket({
          bookingId: booking._id,
          user: req.user.username,
          seat: `${seat.rows}-${seat.number}`,
          film: film.name_film,
          showtime: `${booking.scheduleId.date} ${booking.scheduleId.showTimes}`
        });
        tickets.push(await newTicket.save());
      }
  
      res.status(201).json({
        message: "Payment created successfully",
        tickets
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  module.exports = { createNewPayment };
  
