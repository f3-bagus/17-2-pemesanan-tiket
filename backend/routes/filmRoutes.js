// routes/filmRoutes.js
const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const validasiObjectId = require("../middlewares/isValidObjectId");
const upload = require('../utils/multer')

router.route('/')
    .post(verifyToken,isAdmin,upload.array('images',5), filmController.createFilm)
    .get(filmController.getFilms);
    
router.get('/:id',validasiObjectId, filmController.getFilmById);
router.put('/:id',validasiObjectId,verifyToken,isAdmin,upload.array('images',5), filmController.updateFilmById);
router.delete('/:id',validasiObjectId, verifyToken,isAdmin, filmController.deleteFilmById);

module.exports = router;
