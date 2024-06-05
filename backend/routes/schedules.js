const express = require("express");
const router = express.Router();
const schedulesController = require('../controllers/schedulesController');
const { verifyToken } = require('../middlewares/verifyToken')
const validasiObjectId = require("../middlewares/isValidObjectId");

router.route('/')
    .get(schedulesController.getAllSchedule)
    .post(verifyToken,schedulesController.createNewSchedule)

router.route('/:id')
    .put(verifyToken,validasiObjectId, schedulesController.updateScheduleById)
    .delete(verifyToken,validasiObjectId, schedulesController.deleteScheduleById)

module.exports = router