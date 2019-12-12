const {connect} = require('mongoose')

 connect('mongodb://localhost/simplejwt',{
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
 })
 .then(db=>console.log('db is connected'))
 .catch(err =>console.error(err))
       
