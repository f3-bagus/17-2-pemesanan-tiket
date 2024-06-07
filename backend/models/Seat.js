const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");

const seatSchema = new Schema({
  seats: [
    {
      rows: String,
      number: Number,
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
  },
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
