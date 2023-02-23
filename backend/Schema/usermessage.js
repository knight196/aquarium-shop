const mongoose = require('mongoose')

const UserMessage = new mongoose.Schema(
    {
        orderId: String,
        message: String,
        message_id: String,
        replymsg: String,
        description: String,
        subject: String,
        user_replymsg: String,
        email: String,
        username: String,
        admin: String,
        user: String,
        to:String,
    },
    {
        timestamps: true
    }
)

const usermsg = mongoose.model('usermsg', UserMessage)

module.exports = usermsg