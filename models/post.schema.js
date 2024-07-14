const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    media: {
        fileId: String,
        url: String,
        thumbnailUrl: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [{type: String}]
}, { timestamps: true });

const PostCollection = mongoose.model('post', postSchema);

module.exports = PostCollection;