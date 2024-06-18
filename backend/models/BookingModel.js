const mongoose = require('mongoose');
const moment = require('moment-timezone')
const { Schema } = mongoose

const bookingSchema = new Schema({
    filmId: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Film', 
    },
    costumer: {
        type: String
    },
    date: {
        type: String,
        default: moment().tz('Asia/Jakarta').format('YYYY-MM-DD'),
    },
    time: {
        type: String,
    },
    seats: [
        {
            rows: String,
            number: Number
        }
    ],
    totalPrice: {
        type: Number
    },
    createdAt: { 
        type: String,
        default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') 
    }

})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
