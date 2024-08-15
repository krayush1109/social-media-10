var express = require('express');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { createNewPost, likeOrUnlikePost, deleteUserPost } = require('../controllers/post.controller');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Dedicated - POST ROUTE Created Successfully');
})

router.post('/create', isLoggedIn, createNewPost)

router.get('/like/:pid', isLoggedIn, likeOrUnlikePost)

router.get('/delete/:pid', isLoggedIn, deleteUserPost)

module.exports = router;