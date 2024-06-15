const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");
const { verifyToken } = require('../middlewares/verifyToken');

router
  .route("/:id/order")
  .post(verifyToken ,bookingsController.createBookingOrder)
  .get(verifyToken ,bookingsController.getBookingOrderByUser);

module.exports = router;
