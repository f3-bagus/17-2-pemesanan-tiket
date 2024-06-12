const express = require("express");
const router = express.Router();
const seatsController = require("../controllers/seatsCotroller");
const { verifyToken } = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyToken, seatsController.createNewSeat)
  .get(verifyToken, seatsController.getAllSeat);

module.exports = router;
