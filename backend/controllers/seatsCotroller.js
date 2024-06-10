const Seat = require('../models/Seat');

const getAllSeat = async (req, res) => {
    const seats = await Seat.find({})
    return res.status(200).json(seats)
}


const createNewSeat = async (req, res) => {
    const { rows, number } = req.body.seats[0];

    try {
        const existingSeat = await Seat.findOne({ "seats.rows": rows, "seats.number": number });

        if (existingSeat) {
            return res.status(400).json({
                status: 'error',
                message: 'Seat already booked'
            });
        }

        const newSeat = new Seat(req.body);
        await newSeat.save();

        return res.status(201).json({
            status: 'success',
            message: 'Seat added successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while adding the seat',
            error: error.message
        });
    }
};


module.exports = { createNewSeat, getAllSeat}