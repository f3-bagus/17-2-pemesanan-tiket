const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment-timezone');

const scheduleSchema = new Schema({
    date: {
        type: String,
        default: moment().tz('Asia/Jakarta').format('YYYY-MM-DD'),
    },
    showTimes: [{
        type: String,
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
