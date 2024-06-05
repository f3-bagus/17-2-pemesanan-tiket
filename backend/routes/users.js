const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyToken } = require('../middlewares/verifyToken')

router.route("/").get(verifyToken, usersController.getAllUser);
router
  .route("/:id")
  .get(verifyToken,validasiObjectId, usersController.getUserById)
  .put(verifyToken,validasiObjectId, usersController.updateUserById)
  .delete(verifyToken,validasiObjectId, usersController.deleteUserById);

module.exports = router;
