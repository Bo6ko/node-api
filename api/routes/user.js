const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const { userRole } = require('../middleware/user-role')

const UserController = require('../controllers/user')

router.get('/', checkAuth, userRole('admin'), UserController.user_get_all);

router.post('/signup', UserController.user_signup);

router.post("/login", UserController.user_login)

router.delete('/:userId', UserController.user_delete);


module.exports = router;