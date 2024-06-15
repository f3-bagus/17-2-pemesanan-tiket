const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment-timezone');

const scheduleSchema = new Schema({
    startDate: {
        type: String,
        default: moment().tz('Asia/Jakarta').format('YYYY-MM-DD'),
    },
    endDate: {
        type: String,
        default: moment().tz('Asia/Jakarta').format('YYYY-MM-DD'),
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
