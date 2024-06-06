// routes/filmRoutes.js
const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/films',verifyToken,isAdmin, filmController.createFilm);
router.get('/films', filmController.getFilms);
router.get('/films/:id', filmController.getFilmById);
router.put('/films/:id',verifyToken,isAdmin, filmController.updateFilmById);
router.delete('/films/:id',verifyToken,isAdmin, filmController.deleteFilmById);

module.exports = router;
