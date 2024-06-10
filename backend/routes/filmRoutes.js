// routes/filmRoutes.js
const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const validasiObjectId = require("../middlewares/isValidObjectId");

router.post('/',verifyToken,isAdmin, filmController.createFilm);
router.get('/', filmController.getFilms);
router.get('/:id',validasiObjectId, filmController.getFilmById);
router.put('/:id',validasiObjectId,verifyToken,isAdmin, filmController.updateFilmById);
router.delete('/:id',validasiObjectId, verifyToken,isAdmin, filmController.deleteFilmById);

module.exports = router;
