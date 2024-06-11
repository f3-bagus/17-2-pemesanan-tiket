const mongoose = require('mongoose')
const moment = require('moment-timezone')
const { Schema } = mongoose;

const paymentSchema = new Schema({
    balanceUser: {
        type: Number
    },
    bookingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: { 
        type: String,
        default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') 
    }
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;