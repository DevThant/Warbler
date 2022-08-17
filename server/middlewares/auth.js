const jwt = require('jsonwebtoken');
const {configs} = require('../configs');

//* Authentication
module.exports.loginRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, configs.JWT_SECRET, (error, decoded) => {
            if(decoded) {
                req.user = decoded;
                return next();
            } else {
                return res.status(401).json({message: 'Please login first'});
            }   
        });
    } catch (error) {
        return next({
            status: 401,
            message: 'Please login first'
        });
    }
}

//* Authorization
module.exports.isOwner = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, configs.JWT_SECRET, (error, decoded) => {
            if(decoded) {
                if(decoded._id === req.params.id) {
                    return next();
                } else {
                    return res.status(401).json({message: 'You are not authorized to perform this action'});
                }
            }});
    } catch (error) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
        
    }
}