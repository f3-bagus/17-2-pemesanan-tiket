const mongoose = require('mongoose');
const { Schema } = mongoose

const seatSchema = new Schema({
    rows: {
        type: String,
    },
    number: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat