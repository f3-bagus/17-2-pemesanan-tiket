const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const Film = require("../models/filmModel");

const getAllBooking = async (req, res) => {
    const bookings = await Booking.find({})
    return res.status(200).json(bookings)
}

const createBooking = async (req, res) => {
  const { filmId, scheduleId, seatId } = req.body;
  const film = await Film.findById(filmId);
  const filmPrice = film.price;

  try {
    const seats = await Seat.find({ _id: { $in: seatId } });
    const seatsLength = seats.map((seat) => seat.seats.length);
    if (!seats || seatsLength === 0) {
      return res.status(400).json({ message: "Invalid seat ID provided" });
    }
    const totalPrice = seatsLength * filmPrice;
    let booking = new Booking({
      filmId,
      scheduleId,
      seatId,
      totalPrice,
    });
    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

module.exports = { createBooking, getAllBooking };
