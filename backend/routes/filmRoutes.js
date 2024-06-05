// routes/filmRoutes.js
const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.post('/films', filmController.createFilm);
router.get('/films', filmController.getFilms);
router.get('/films/:id', filmController.getFilmById);
router.put('/films/:id', filmController.updateFilmById);
router.delete('/films/:id', filmController.deleteFilmById);

module.exports = router;
