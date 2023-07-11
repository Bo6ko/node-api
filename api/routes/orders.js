const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.getAllByUserId);

router.get('/:id', checkAuth, OrdersController.getById);

router.post('/', checkAuth, OrdersController.create);

router.put('/', checkAuth, OrdersController.update);

router.delete('/:id', checkAuth, OrdersController.delete);

module.exports = router;