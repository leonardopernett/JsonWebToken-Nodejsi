const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new  Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String}
})


UserSchema.methods.encryptPassword = async function(password){
   const salt = await bcrypt.genSalt(10)
   return  bcrypt.hash(password, salt)

}

UserSchema.methods.validatePassword = async  function(password){

    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)