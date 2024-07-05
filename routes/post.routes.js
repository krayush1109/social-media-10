var express = require('express');
const imagekit = require('../utils/imagekit');
const { isLoggedIn } = require('../middleware/auth');
const PostCollection = require('../models/post.schema');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Dedicated - POST ROUTE Created Successfully');
})

router.post('/create', isLoggedIn, async (req, res, next) => {
    try {
        const newPost = new PostCollection(req.body);
        console.log("post route create pg");
        console.log("NEW POST : ", newPost);

        const { fileId, url, thumbnailUrl } = await imagekit.upload({
            file: req.files.media.data,
            fileName: req.files.media.name,
            folder: '/posts'
        });
        
        newPost.media = { fileId, url, thumbnailUrl };
        newPost.user = req.user._id;

        req.user.posts.push(newPost._id);

        await newPost.save();
        await req.user.save();

        res.redirect('/user/profile');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = router;