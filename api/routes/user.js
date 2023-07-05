const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { userRole } = require('../middleware/user-role');

const UserController = require('../controllers/user')

router.get('/users', UserController.getAllUsers);

router.post('/user/signup', UserController.userSignup);

router.post("/user/login", UserController.user_login)

router.delete('/user/:userId', userRole('admin'), UserController.user_delete);

module.exports = router;