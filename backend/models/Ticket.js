const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    name: {
        type: String,
        default: FlickBox
    },
    ticketPrice: {
        type: Number,
        default: 35000
    },
    location: {
        type: String,
        default: Indonesia,
    },
    bookingId: {
        type: String,
        ref: 'Booking',
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket