const jwt = require('jsonwebtoken')
const {secret} = require('../config.js')
function verifyToken(req, res ,next){
    const token =  req.headers['x-access-token']
    if(!token){
        return res.status(401).json({auth:false, message:'not token found'})
    }
    
    const decode = jwt.verify(token, secret)
     req.usuarioId =  decode.id
    next()
}

module.exports = verifyToken ;