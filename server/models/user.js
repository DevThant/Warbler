const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcrypt');
const {configs} = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required:true, 
        unique: true
    },
    password: String,
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashPassword = bcrypt.hashSync(user.password, configs.saltFactor);
    user.password = hashPassword;
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
}

const User = model('User', userSchema);

module.exports = User;
