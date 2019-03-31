import express from 'express'
import checkAuth from '../middleware/checkAuth'

//models
import Post from '../models/Post'
import User from '../models/User'

//express 
const router = express.Router();

router.get('/posts', async (req, res, next) => {
    const posts = await Post.findAll({
        include: [{ model: User }]
    })
    res.status(200).json({
        message: "all posts",
        posts
    })
})

router.post('/post', checkAuth, async (req, res, next) => {
    const newPost = await Post.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.userData.id
    })
    res.status(200).json({
        message: "post successfully created",
        post: newPost
    })
})

export default router;