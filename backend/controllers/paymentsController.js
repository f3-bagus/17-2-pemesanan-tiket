const Booking = require('../models/Booking');
const Payment = require('../models/Payment')

const createNewPayment = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate('filmId').populate('scheduleId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        const payment = new Payment({
            uploadImage: req.body.uploadImage,
            user: req.user.username,
            bookingId: booking._id
        });
        await payment.save();
        res.status(201).json({
            message: 'Payment created successfully',
            payment
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createNewPayment }