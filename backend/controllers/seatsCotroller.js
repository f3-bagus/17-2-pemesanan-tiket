const Seat = require('../models/Seat');

const getAllSeat = async (req, res) => {
    const seats = await Seat.find({})
    return res.status(200).json(seats)
}


const createNewSeat = async (req, res) => {
    const seats = new Seat(req.body)
    await seats.save();
    return res.status(201).json({
        status: 'success',
        message: 'Seat added successfully'
    })
}

module.exports = { createNewSeat, getAllSeat}