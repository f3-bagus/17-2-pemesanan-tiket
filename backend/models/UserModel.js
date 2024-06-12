const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment-timezone');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noHp: {
        type: Number,
    },
    balance: {
        type: Number,
        default: 100000
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: String,
        default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
