const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { userRole } = require('../middleware/user-role');

const UserController = require('../controllers/user')

router.get('/', UserController.getAll);

router.post('/signup', UserController.signup);

router.post("/login", UserController.login)

router.delete('/:id', checkAuth, userRole('admin'), UserController.delete);

module.exports = router;