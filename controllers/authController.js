const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, password, email, noHp } = req.body
    if (!username || !password || !email || !noHp) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid input data'
        })
    }
    const emailUsed = await User.findOne({email})
    if (emailUsed) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email is already in use'
        })
      }
    const passwordHash = bcrypt.hashSync(password, 10)
    await User.create({
        username,
        password: passwordHash,
        email,
        noHp,
    })
    return res.status(201).json({
        status: 'success',
        message: 'Register Accepted'
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid input data'
        })
    }
    const user = await User.findOne({email})
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'Email Not Registered'
        })
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword) {
        return res.status(401).json({
            status: 'fail',
            message: 'Email and Password incorrect'
          })
    }
    let data = {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    const token = jwt.sign({data}, 'shhh',{
        expiresIn: '1d'
    } )
    return res.status(200).json({
        status: 'success',
        message: 'Loggedin',
        token
    })
}

module.exports = { register, login }