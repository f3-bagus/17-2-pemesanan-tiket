// const Seat = require("../models/SeatModel");
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
    const { seats } = req.body;
    const costumer = req.user.username; 
    const { id } = req.params;

    try {
        const booking = await Booking.findOne({ costumer, filmId: id, hasTicket: false });

        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: "Booking not found",
            });
        }
  
        for (const seat of seats) {
            const { rows, number } = seat;
            const existingSeat = booking.seats.find(s => s.rows === rows && s.number === number);
            if (existingSeat) {
                return res.status(400).json({
                    status: "error",
                    message: `Seat ${rows}-${number} already booked`,
                });
            }
            booking.seats.push({ rows, number });
        }
  
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
            message: "Seat added successfully",
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
