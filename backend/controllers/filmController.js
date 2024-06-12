// controllers/filmController.js
const Film = require('../models/filmModel');
const fs = require('fs')

// Create a new film
exports.createFilm = async (req, res) => {
  try {
    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }))

    const film = new Film(req.body);
    film.images = images
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
    const film = await Film.findOne({ _id: req.params.id });
    console.log(film);
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
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!film) return res.status(404).json({ error: 'Film not found' });
    if (req.files && req.files.length > 0) {
      film.images.forEach(image => {
        fs.unlink(image.url, err => new Error('Only images are allowed'))
      });
  
      const image = req.files.map(file => ({
        url: file.path,
        filename: file.filename,
      }))
      film.images = image
      await film.save()
    }
    
    res.status(200).json(film);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// Delete a film by ID
exports.deleteFilmById = async (req, res) => {
  try {
    const film = await Film.findOneAndDelete({ _id: req.params.id });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    if (film.images && film.images.length > 0) {
      film.images.forEach(image => {
        fs.unlink(image.url, err => new Error(err))
      });
    }
    res.status(200).json({ message: 'Film deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
