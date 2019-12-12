const {Router} = require('express')
const router = Router()
const verifyToken = require('../controller/verifyToken')

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

router.post('/signup', async (req, res, next)=>{
    const {username, email, password} = req.body
    const user = new User({
        username:username,
        email:email,
        password:password
    })
     user.password = await  user.encryptPassword(user.password)
     const saveUser = await user.save()
     const tokens = jwt.sign({id:saveUser._id}, secret,{
       expiresIn: 60 * 60 * 24
   })
     res.json({auth:true, token:tokens})
})

router.post('/signin',async  (req, res, next)=>{
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({mensaje:"user not found"})
    }
    const validator =  await user.validatePassword(password)
    if(!validator){
        return res.status(404).send('passwor not found');
    }
    const tokens = jwt.sign({id: user._id}, secret,{
        expiresIn: 60 * 60 *24
    })
      res.json({auth:true, token:tokens})
})


router.get('/profile', verifyToken ,async (req, res, next)=>{
     const user = await  User.findById(req.usuarioId, {password:0})
      if(!user){
        return res.status(404).send("not user found")
      }
     res.json(user)
})

module.exports = router