const Booking = require("../models/BookingModel");
const Ticket = require('../models/TicketModel');
const Seat = require("../models/SeatModel");
const moment = require('moment-timezone');

const getBookingOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ filmId: id }).populate(
      "filmId"
    );
    // console.log(booking);
    const seatNumber = booking.seats.map((seat) => `${seat.rows} - ${seat.number}`)
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
      const order = await Booking.findOne({ filmId: id }).populate("filmId");
      const totalPrice = order.totalPrice;
      const userBalance = req.user.balance;
      if (userBalance < totalPrice) {
          return res.status(400).json({ message: "Insufficient balance" });
      }
      const newBalance = userBalance - totalPrice;
      req.user.balance = newBalance;
      await req.user.save();

      // Check seat availability based on time
      const existingSeats = await Seat.find({ 
          bookingId: { $exists: true, $ne: null },
          "createdAt": {
              $gte: moment().tz('Asia/Jakarta').startOf('day').format(),
              $lt: moment().tz('Asia/Jakarta').endOf('day').format()
          }
      });

      const bookedTimes = existingSeats.map(seat => seat.createdAt);

      const seats = order.seats.filter(seat => {
          const seatTime = moment(seat.createdAt).tz('Asia/Jakarta');
          return !bookedTimes.includes(seatTime.format());
      });

      // Save seats to Seat model
      for (const seat of seats) {
          const newSeat = new Seat({
              rows: seat.rows,
              number: seat.number,
              bookingId: order._id,
          });
          await newSeat.save();
      }

      // Create tickets
      const tickets = [];
      for (const seat of seats) {
          const newTicket = new Ticket({
              costumer: req.user.username,
              seat: `${seat.rows}-${seat.number}`,
              film: order.filmId.name_film,
              showtime: `${order.date}-${order.time}`,
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
