const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const {configs} = require('../configs');

module.exports.registerUser = async (req, res, next) => {
    try {
        const user = new User({... req.body});
        await user.save();
        const {_id, name, email} = user;
        const token = jwt.sign({_id, name, email}, configs.JWT_SECRET);
        res.status(201).json({message: 'User created successfully', _id, name, email, token});
    } catch (error) {
        if(error.code === 11000) {
           return res.status(409).json({message: 'Username/Email already exists'});
        } 
        return next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const{email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        if(!user.comparePassword(password)) {
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        const {_id, name} = user;
        const token = jwt.sign({_id, name, email}, configs.JWT_SECRET);
        res.status(200).json({message: 'User logged in successfully', _id, name, email, token});
        
    } catch (error) {
        return next(error);
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
}