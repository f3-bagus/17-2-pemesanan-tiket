const Seat = require("../models/SeatModel");
const Booking = require("../models/BookingModel");
// const Film = require('../models/filmModel');

const getBookingByUser = async (req, res) => {
  const bookings = await Booking.findOne({
    costumer: req.user.username,
  }).populate("filmId");
  return res.status(200).json({
    film: bookings.filmId.name_film,
    "Date & Time": `${bookings.date} - ${bookings.time}`,
  });
};

const createNewSeat = async (req, res) => {
  const { seats } = req.body; // Assuming seats is an array of seat objects
  const costumer = req.user.username; // Assuming the username is available in req.user
  // Find the booking and update totalPrice

  try {
    // Check if any of the seats are already booked
    const booking = await Booking.findOne({ costumer });
    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }
    for (const seat of seats) {
      const { rows, number } = seat;
      const existingSeat = await Seat.findOne({
        "seats.rows": rows,
        "seats.number": number,
      });

      if (existingSeat) {
        return res.status(400).json({
          status: "error",
          message: `Seat ${rows}-${number} already booked`,
        });
      }
    }

    // Save new seats
    const newSeat = new Seat(req.body);
    booking.seatId = newSeat
    await newSeat.save();

    // Assuming the film price is stored in the film model
    const film = await Booking.findOne({ costumer }).populate("filmId");
    const seatPrice = film.filmId.price;

    // Calculate total price for the seats booked
    const totalSeats = seats.length;
    const total = seatPrice * totalSeats;

    booking.totalPrice = (booking.totalPrice || 0) + total;
    await booking.save();

    return res.status(201).json({
      status: "success",
      message: "Seat added successfully and booking updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while adding the seat",
      error: error.message,
    });
  }
};

module.exports = { createNewSeat, getBookingByUser };
