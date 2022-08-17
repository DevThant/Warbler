const express = require('express');
const router = express.Router();

//* Controllers
const {registerUser, loginUser, getAllUsers} = require('../controllers/user.controller');

//* Middlewares
const {loginRequired, isOwner} = require('../middlewares/auth.js');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/list', loginRequired, getAllUsers);


module.exports = router;