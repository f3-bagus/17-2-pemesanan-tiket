const express = require("express");
const router = express.Router();
const seatsController = require("../controllers/seatsCotroller");
const { verifyToken } = require("../middlewares/verifyToken");

router.route('/:id/seat-picker')
  .post(verifyToken, seatsController.createNewSeat)
  .get(verifyToken, seatsController.getBookingByUser)
  

module.exports = router;
