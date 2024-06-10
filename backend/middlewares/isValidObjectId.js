const mongoose = require('mongoose')

const validasiObjectId = (req, res, next) => {
        const paramId = ['id','bookingId'].find((param => req.params[param]))

        if (!paramId) {
            return next()
        }

        const id = req.params[paramId]
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID',
            });
        }
        next()
    }

module.exports = validasiObjectId