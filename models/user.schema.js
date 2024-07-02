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
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        fileId: String,
        url: {
            type: String,
            default: "https://ik.imagekit.io/krayush/default-image.jpg?updatedAt=1719568500884",                   
        },
        thumbnailUrl: {            
            type: String,                
            default: "https://ik.imagekit.io/krayush/default-image.jpg?updatedAt=1719568500884",            
        },
    },
    otp: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true}
);

user_schema.plugin(plm);

const UserCollection = mongoose.model("social-media", user_schema)

console.log("Schema Created");

module.exports = UserCollection;

