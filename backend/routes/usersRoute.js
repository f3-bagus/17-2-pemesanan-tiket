const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyToken, verifyUser } = require('../middlewares/verifyToken');

router.route("/users").get(verifyToken,verifyUser, usersController.getAllUser);
router
  .route("/users/:id")
  .get(validasiObjectId,verifyToken,verifyUser,  usersController.getUserById)
  .put(validasiObjectId,verifyToken,verifyUser,  usersController.updateUserById)
  .delete(validasiObjectId,verifyToken,verifyUser,  usersController.deleteUserById);

router.route('/profile').get(verifyToken, usersController.getProfile)

module.exports = router;
