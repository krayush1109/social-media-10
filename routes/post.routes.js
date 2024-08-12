var express = require('express');
const imagekit = require('../utils/imagekit');
const { isLoggedIn } = require('../middleware/auth');
const PostCollection = require('../models/post.schema');
const { createNewPost, likeOrUnlikePost, deleteUserPost } = require('../controllers/post.controller');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Dedicated - POST ROUTE Created Successfully');
})

router.post('/create', isLoggedIn, createNewPost)

router.get('/like/:pid', isLoggedIn, likeOrUnlikePost)

router.get('/delete/:pid', isLoggedIn, deleteUserPost)

module.exports = router;