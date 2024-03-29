const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
         
        },
        email: {
            type: String,
          
        },
        password: {
            type: String,
         
        },
        role: {
            type: Number,
            default: 0,
        },
        OTP: {
            type:String,
            default:''
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;