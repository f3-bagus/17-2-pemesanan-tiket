const Booking = require('../models/Booking');

const createNewPayment = async (req, res) => {
    const {bookingId} = req.params
    const booking = await Booking.findById(bookingId);
    console.log(booking);
}

module.exports = { createNewPayment }