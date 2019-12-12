const express = require('express')
const app = express()

//setting
app.set('port', process.env.PORT || 3000)


//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//routes
app.use(require('./controller/AuthController.js'))



module.exports = app