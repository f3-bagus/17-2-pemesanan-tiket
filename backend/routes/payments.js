const express = require("express");
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');
const { verifyToken } = require("../middlewares/verifyToken");
const validasiObjectId = require("../middlewares/isValidObjectId");

router.route('/:bookingId/payments').post(verifyToken,validasiObjectId,paymentsController.createNewPayment)

module.exports = router