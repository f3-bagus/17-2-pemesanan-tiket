const mongoose = require('mongoose')
const moment = require('moment-timezone')
const { Schema } = mongoose;

const paymentSchema = new Schema({
    user: {
        type: String
    },
    bookingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
    },
    uploadImage: {
        type: String,
        required: true,
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