const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address format',
        },
      },
    role:
    {
        type:String,
        required: true,
        default:'client',
        enum:['client', 'admin']
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    
},
{    timestamps:true
}
);


userSchema.pre('save',async function(next){
    try {
        if(!this.isModified("password"))return next()

        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next()
    }
    catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;