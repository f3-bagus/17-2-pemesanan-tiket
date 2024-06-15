const User = require("../models/UserModel");
const fs = require('fs')

const getAllUser = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  return res.status(200).json(user);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  await user.updateOne(req.body, { new: true });
  return res.status(200).json({
    status: "success",
    message: "User updated successfully",
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  await user.deleteOne();
  return res.status(200).json({
    status: "success",
    message: "User has been successfully deleted",
  });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({
      image: user.image,
      username: user.username,
      password: user.password,
      email: user.email,
      telephone: user.noHp,
      isAdmin: user.isAdmin,
      saldo: user.balance,
  })
}

const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate({_id: req.user._id}, req.body, {new: true});
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'failed updated'
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'updated successfully'
  })
}

const changeAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.file) {
      if (user.image && user.image.url) {
        fs.unlink(user.image.url, (err) => {
          if (err) {
            console.error('Failed to delete old image:', err);
          }
        });
      }
      const image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      user.image = image;
      await user.save();

      return res.status(200).json({ message: 'Avatar updated successfully', image: user.image });
    } else {
      return res.status(400).json({ message: 'No image files provided' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { getAllUser, getUserById, updateUserById, deleteUserById, getProfile, updateProfile, changeAvatar };
