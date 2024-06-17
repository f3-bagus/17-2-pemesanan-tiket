const mongoose = require('mongoose');
const moment = require('moment-timezone');

const filmSchema = new mongoose.Schema({
  name_film: { type: String, required: true },
  linkTrailer: { type: String },
  duration: { type: String, required: true },
  genre: { type: String, required: true },
  synopsis: { type: String, required: true },
  images: [{ url: String, filename: String,}],
  director: { type: String, required: true },
  writer: { type: String, required: true },
  cast: { type: String, required: true },
  distributor: { type: String, required: true },
  age: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: String,
    default: () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') }
});

filmSchema.pre('save', function (next) {
  if (this.linkTrailer) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = this.linkTrailer.match(regex);
    if (match && match[1]) {
      this.linkTrailer = match[1];
    }
  }
  next();
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
