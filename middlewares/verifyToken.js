const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You Are Not Authenticated'
        })
    }
    try {
        const jwtToken = token.split(' ').pop();
        const data = jwt.verify(jwtToken, 'shhh');
        // console.log(data.data);
        const user = await User.findById(data.data._id);
        // console.log(user);
        if (!user) {
            return res.status(404).json({
              status: 'fail',
              message: 'User Not Found',
            });
          }
          req.user = user
          next()
    } catch (err) {
        return res.status(403).json({
            status: 'fail',
            message: 'Incorrect Credentials'
        })
    }
}

module.exports = {verifyToken}