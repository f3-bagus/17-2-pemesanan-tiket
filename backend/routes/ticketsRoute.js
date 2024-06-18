const express = require("express");
const router = express.Router();
const ticketsController = require('../controllers/ticketsController')
const { verifyToken } = require("../middlewares/verifyToken");

router.get('/',verifyToken, ticketsController.getTicketByUser);
router.get('/all',verifyToken, ticketsController.getAllTicket)

module.exports = router