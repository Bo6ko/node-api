const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { userRole } = require('../middleware/user-role');

const UserController = require('../controllers/user')

router.get('/users', UserController.getAll);

router.post('/user/signup', UserController.signup);

router.post("/user/login", UserController.login)

router.delete('/user/:id', checkAuth, userRole('admin'), UserController.delete);

module.exports = router;