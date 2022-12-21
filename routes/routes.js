const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const { SECRET } = process.env;


router.post('/register', async (req,res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    const result = await user.save();
    const {password, ...data} = await result.toJSON();

    res.send(data)
})

router.post('/login',async (req,res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user){
        res.status(404).send({
            message : "User not found"
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)){
        res.status(400).send({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign({_id: user._id}, SECRET)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})


router.get('/user',async (req,res)=> {
    //try{
        // const cookie = req.cookies.jwt
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, SECRET)

        if (!claims){
            res.status(401).send({
                message : "Unauthenticated 1"
            })
        }

        const user = await User.findOne({_id:claims.id})
        const  {password, ...data} = await user.toJSON()

        //res.send(data)
        res.send(cookie)
    //}
    // catch(e){
    //     res.status(401).send({
    //         message : "Unauthenticated 2"
    //     })
    // }
})

router.post('/logout', (req,res) => {
    res.cookie('jwt','', {
        maxAge : 0
    })
    res.send({
        message: 'success'
    })
})

module.exports =  router;