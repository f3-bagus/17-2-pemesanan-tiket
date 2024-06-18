const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");
const { verifyToken } = require('../middlewares/verifyToken');
const { clearTempSeats } = require('../middlewares/saveSeat')

router
  .route("/:id/order")
  .post(verifyToken ,clearTempSeats,bookingsController.createBookingOrder)
  .get(verifyToken ,bookingsController.getBookingOrderByUser);

module.exports = router;
