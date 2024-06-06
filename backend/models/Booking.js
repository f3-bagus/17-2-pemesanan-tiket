const mongoose = require('mongoose');
const { Schema } = mongoose

const bookingSchema = new Schema({
    movie: { 
        type: Number, ref: 'Film', required: true
    },
    showtime: {
        type: mongoose.Schema.ObjectId, ref: 'Schedule'
    },
    seats: {
        type: mongoose.Schema.ObjectId, ref: 'Seat'
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking