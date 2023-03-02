import mongoose from 'mongoose';    
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
    username : {
        required : true,
        type :String
    },
    email : {
        required : true,
        type :String
    },
    password : {
        required : true,
        type :String, 
        min : 5
    },
    googleId: String,
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
    const isPassword = await bcrypt.compare(this.password, enteredPassword);
    return isPassword;
}
const User = new mongoose.model('User',UserSchema);
module.exports = User;
