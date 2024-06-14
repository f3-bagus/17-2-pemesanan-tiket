const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validasiObjectId = require("../middlewares/isValidObjectId");
const { verifyToken, verifyUser } = require('../middlewares/verifyToken');
const upload = require('../utils/multer')

router.route("/users").get(verifyToken, usersController.getAllUser);
router
  .route("/users/:id")
  .get(validasiObjectId,verifyToken,  usersController.getUserById)
  .put(validasiObjectId,verifyToken,  usersController.updateUserById)
  .delete(validasiObjectId,verifyToken,  usersController.deleteUserById);

router.route('/profile')
  .get(verifyToken, usersController.getProfile)
  .put(verifyToken, verifyUser, usersController.updateProfile)

router.route('/profile/avatar').put(verifyToken, verifyUser,upload.single('image'), usersController.changeAvatar)

module.exports = router;
