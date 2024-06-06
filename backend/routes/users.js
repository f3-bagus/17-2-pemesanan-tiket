const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyToken, verifyUser } = require('../middlewares/verifyToken');

router.route("/").get(verifyToken,verifyUser, usersController.getAllUser);
router
  .route("/:id")
  .get(validasiObjectId,verifyToken,verifyUser,  usersController.getUserById)
  .put(validasiObjectId,verifyToken,verifyUser,  usersController.updateUserById)
  .delete(validasiObjectId,verifyToken,verifyUser,  usersController.deleteUserById);

module.exports = router;
