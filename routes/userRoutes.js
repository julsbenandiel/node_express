import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//instantiate router
const router = express.Router()

//models
import User from '../models/User'
import Post from '../models/Post'

//GET ALL USERS
router.get('/users', async (req, res, next) => {
    const getAllusers = await User.findAll({
        include: [{ model: Post }]
    });
    console.log(req.userData)
    res.json(getAllusers);
})

//CRETE NEW USER
router.post('/signup', async (req, res, next) => {
    const isExist = await User.findOne({
        where: { email: req.body.email }
    })

    if (isExist) {
        res.status(404).json({
            message: "User with the given email, already exist"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    res.json(newUser);
})

//LOGIN USER
router.post('/login', async (req, res, next) => {

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user) {
        res.send(404).json({
            message: "User not found"
        })
        return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        res.send(404).json({
            message: "Password didn\'t match"
        })
        return;
    }

    try {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, "SUPER_SECRET", {
                expiresIn: 3600
            })

        return res.status(200).json({
            message: "Auth Successful",
            token: token
        })
    } catch (error) {
        console.log(errpr)
    }

})

//DELETE USER
router.delete('/delete/:userId', async (req, res, next) => {
    const userId = req.params.userId
    const user = await User.destroy({
        where: { id: userId }
    })
    res.json({
        message: "User successfully deleted..."
    })
})



export default router;