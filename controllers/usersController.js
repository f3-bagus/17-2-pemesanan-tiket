const User = require('../models/User');

const getAllUser = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User Not Found'
        })
    }
    return res.status(200).json(user)
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User Not Found'
        })
    }
    await user.updateOne(req.body, {new: true})
    return res.status(201).json({
        status: 'success',
        message: 'User updated successfully'
    })
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User Not Found'
        })
    }
    await user.deleteOne();
    return res.status(201).json({
        status: 'success',
        message: 'User has been successfully deleted'
    })
}

module.exports = { getAllUser, getUserById, updateUserById, deleteUserById }