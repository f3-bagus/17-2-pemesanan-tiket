const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    bookingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
    },
    name: {
        type: String,
        default: 'FlickBox',
    },
    ticketPrice: {
        type: Number,
        default: 35000
    },
    location: {
        type: String,
        default: 'Indonesia',
    },
    seat: {
        type: Array,
    },
    film: {
        type: String,
    },
    showtime: {
        type: String,
    },
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket

// name: {
//     type: String,
//     default: FlickBox
// },
// ticketPrice: {
//     type: Number,
//     default: 35000
// },
// location: {
//     type: String,
//     default: Indonesia,
// },
// bookingId: {
//     type: String,
//     ref: 'Booking',
// }  