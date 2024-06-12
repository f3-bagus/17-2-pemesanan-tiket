const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");
const { verifyToken } = require('../middlewares/verifyToken');

router
  .route("/")
  .post(verifyToken ,bookingsController.createBooking)
  .get(verifyToken ,bookingsController.getAllBooking);

module.exports = router;
