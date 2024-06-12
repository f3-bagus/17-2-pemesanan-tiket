const Schedule = require('../models/ScheduleModel')

const getAllSchedule = async (req, res) => {
    const schedules = await Schedule.find({})
    return res.status(200).json(schedules)
}

const createNewSchedule = async (req, res) => {
    const {date} = req.body
    if (!date) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid input data'
        })
    }
    await Schedule.create(req.body)
    return res.status(201).json({
        status: 'success',
        message: 'schedule added successfully'
    })
}

const updateScheduleById = async (req, res) => {
    const { id } = req.params
    const {date} = req.body
    if (!date) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid input data'
        })
    }
    const schedule = await Schedule.findById(id)
    if (!schedule) {
        return res.status(404).json({
            status: 'fail',
            message: 'Schedule Not Found'
        })
    }

    await schedule.updateOne(req.body, {new: true})
    return res.status(200).json({
        status: 'success',
        message: 'schedule updated successfully'
    })
}

const deleteScheduleById = async (req, res) => {
    const { id } = req.params
    const schedule = await Schedule.findById(id)
    if (!schedule) {
        return res.status(404).json({
            status: 'fail',
            message: 'Schedule Not Found'
        })
    }
    await schedule.deleteOne()
    return res.status(200).json({
        status: 'success',
        message: 'schedule deleted successfully'
    })
}

module.exports = {getAllSchedule, createNewSchedule, updateScheduleById, deleteScheduleById}