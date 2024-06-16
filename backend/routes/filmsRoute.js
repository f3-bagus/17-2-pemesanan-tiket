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

router.get('/admin', filmController.getFilms)
    
router.route('/:id')
    .get(validasiObjectId, filmController.getFilmById)
    .post(verifyToken, validasiObjectId, filmController.createSchedule)
    
router.put('/:id',validasiObjectId,verifyToken,isAdmin,upload.array('images',5), filmController.updateFilmById);
router.delete('/:id',validasiObjectId, verifyToken,isAdmin, filmController.deleteFilmById);


module.exports = router;
