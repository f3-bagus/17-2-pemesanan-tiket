// controllers/filmController.js
const Film = require('../models/filmModel');

// Create a new film
exports.createFilm = async (req, res) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all films
exports.getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single film by ID
exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findOne({ id_film: req.params.id });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a film by ID
exports.updateFilmById = async (req, res) => {
  try {
    const film = await Film.findOneAndUpdate(
      { id_film: req.params.id },
      req.body,
      { new: true }
    );
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json(film);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a film by ID
exports.deleteFilmById = async (req, res) => {
  try {
    const film = await Film.findOneAndDelete({ id_film: req.params.id });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json({ message: 'Film deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
