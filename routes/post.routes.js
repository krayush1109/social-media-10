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

router.get('/like/:pid', isLoggedIn, async (req, res, next) => {
    try {
        const post = await PostCollection.findById(req.params.pid);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log(post);

        // Check if the user has already liked the post
        if (post.likes.includes(req.user._id)) {
            // unlike the post
            console.log("removing like");
            post.likes = post.likes.filter(item => item.toString() !== req.user._id.toString());
        } else {
            // Like the post
            post.likes.push(req.user._id);
        }

        await post.save();
        console.log(post);

        // res.send(result + req.user.posts);
        // res.status(200).send("Working Fine");
        
        console.log(req.query.redirect);
        res.redirect('/user/profile');
    } catch (error) {
        console.log(error)
        // res.render(error);
        res.json(error)
    }
})

router.get('/delete/:pid', isLoggedIn, async (req, res, next) => {
    try {
        const post = await PostCollection.findByIdAndDelete(req.params.pid);

        // req.user.posts.filter(item => console.log(item.toString()));
        req.user.posts = req.user.posts.filter(item => item.toString() != req.params.pid);

        await req.user.save();

        // res.json(post, req.params.pid, "POST Deleted!");
        // res.json("Post Deleted!");  
        res.redirect('/user/profile');
    } catch (error) {
        console.log(error);
        res.render(error);
    }
})

module.exports = router;