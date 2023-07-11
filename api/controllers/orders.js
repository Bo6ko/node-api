const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllByUserId = (req, res, next) => {
    Order.getAllByUserId(req.userData, (err, results) => {
        if(err) {
            console.log('Error retrieving orders:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.getById = (req, res, next) => {
    const id = req.params.orderId;
    Order.getById(req.params, req.userData, (err, results) => {
        if(err) {
            console.log('Error retrieving orders:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.create = (req, res, next) => {
    const product = req.body.product;
    const order = product.order;
    Product.getById(product, req.userData, (err, findProduct) => {
        if(err) {
            console.error('This product doesn\'t exists: ', err);
            res.status(500).json({ error: 'This product doesn\'t exists' });
        } else {
            if ( findProduct.length > 0 ) {
                Order.create(order, (err, createOrder) => {
                    if(err) {
                        console.error('Error creating order: ', err);
                        res.status(500).json({ error: 'Failed to create order' });
                    } else {
                        const newOrder = {
                            ...{id: createOrder}, 
                            ...order
                        };
                        res.status(201).json(newOrder);
                    }
                });
            }
        }
    });
}

exports.update = (req, res, next) => {
    const product = req.body.product;
    Order.update(product.order, req.userData, (err, updatedOrder) => {
        if(err) {
            console.error('Error updating order: ', err);
            res.status(500).json({ error: 'Failed to update order' });
        } else {
            res.status(201).json(product);
        }
    });
}

exports.delete = (req, res, next) => {
    Order.delete(req, (err, results) => {
        if(err) {
            console.log('Error: ', err);
            res.status(500).json(err);
        } else {
            console.log(results)
            res.status(200).json(results);
        }
    })
}