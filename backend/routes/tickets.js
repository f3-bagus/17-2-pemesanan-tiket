const express = require("express");
const router = express.Router();
const ticketsController = require('../controllers/ticketsController')
const { verifyToken } = require("../middlewares/verifyToken");

router.route('/').get(verifyToken, ticketsController.getAllTicket)

module.exports = router