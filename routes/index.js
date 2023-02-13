var express = require('express');
var router = express.Router();
const userController = require('../controller/user')

/* GET home page. */
router.post('/signup', userController.signUp)

router.post('/login', userController.Login)

router.get('/allusers',userController.secure, userController.allUsers)

router.get('/user',userController.secure, userController.User)

module.exports = router;
