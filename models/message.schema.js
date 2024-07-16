const mongoose = require('mongoose')

const msgSchema = mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
})

const MsgCollection = mongoose.model('messages', msgSchema)

module.exports = MsgCollection