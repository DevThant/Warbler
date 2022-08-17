module.exports.ErrorHandler = (err, req, res, next) =>{
    res.status(err.status || 500);
    res.send({status: err.status, message: err.message});
}