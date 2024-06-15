// const express = require("express");
// const router = express.Router();
// const schedulesController = require('../controllers/schedulesController');
// const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
// const validasiObjectId = require("../middlewares/isValidObjectId");

// router.route('/')
//     .get(schedulesController.getAllSchedule)
//     .post(verifyToken, isAdmin, schedulesController.createNewSchedule)

// router.route('/:id')
//     .put(verifyToken, isAdmin, validasiObjectId, schedulesController.updateScheduleById)
//     .delete(verifyToken, isAdmin, validasiObjectId, schedulesController.deleteScheduleById)

// module.exports = router