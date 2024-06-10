// routes/filmRoutes.js
const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/',verifyToken,isAdmin, filmController.createFilm);
router.get('/', filmController.getFilms);
router.get('/:id', filmController.getFilmById);
router.put('/:id',verifyToken,isAdmin, filmController.updateFilmById);
router.delete('/:id',verifyToken,isAdmin, filmController.deleteFilmById);

module.exports = router;
