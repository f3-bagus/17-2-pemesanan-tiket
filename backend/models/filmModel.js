// models/filmModel.js
const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  id_film: { type: Number, required: true, unique: true },
  nama_film: { type: String, required: true },
  durasi: { type: String, required: true },
  genre: { type: String, required: true },
  sinopsis: { type: String, required: true },
  gambar: { type: String, required: true },
  sutradara: { type: String, required: true },
  penulis: { type: String, required: true },
  pemeran: { type: String, required: true },
  distributor: { type: String, required: true },
  usia: { type: Number, required: true },
  harga: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
