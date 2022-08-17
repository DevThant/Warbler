const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

module.exports.registerUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        const {_id, name, email} = user;
        const token = jwt.sign({_id, name, email}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(201).json({message: 'User created successfully', _id, name, email, token});
    } catch (error) {
        if(error.code === 11000) {
            res.status(400).json({message: 'Username/Email already exists'});
        } 
        //todo make httperror
        return next(error)
    }
}