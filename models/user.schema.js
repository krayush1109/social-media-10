const mongoose = require('mongoose')

const plm = require('passport-local-mongoose')

const user_schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: String,   
    avatar: {
        type: String,
        default: "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png",
    },
    otp: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true}
);

user_schema.plugin(plm);

const User_Collection = mongoose.model("social-media", user_schema)

console.log("Schema Created");

module.exports = User_Collection;

