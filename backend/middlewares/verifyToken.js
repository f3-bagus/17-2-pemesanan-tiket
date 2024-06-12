const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You Are Not Authenticated",
    });
  }
  try {
    const jwtToken = token.split(" ").pop();
    const data = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log(data.data);
    const user = await User.findById(data.data._id);
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User Not Found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      status: "fail",
      message: "Incorrect Credentials",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: "fail",
      message: "You Are Not Authorized",
    });
  }
};

const verifyUser = (req, res, next) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: "fail",
      message: "You Are Not Authorized",
    });
  }
};

module.exports = { verifyToken, isAdmin, verifyUser };
