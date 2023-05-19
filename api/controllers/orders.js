const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order
        .find()
        // like join
        .populate('product')
        .select('product quantity _id')
        //exec is promise
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    // old code
    // res.status(200).json({
    //     message: 'Handling Get requests to /orders'
    // })
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if ( !product ) {
                return res.status(404).json({
                    message: 'Product not found!'
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order
                .save()
                
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET'
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    //old code
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // };
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order: order
    })
}

exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
        .exec()
        .then(order => {
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    //old code
    // if ( id === 'special' ) {
    //     res.status(200).json({
    //         message: 'You discovered the special ID'
    //     })
    // } else {
    //     res.status(200).json({
    //         message: 'you passed an ID'
    //     })
    // }
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.removeAllListeners({_id: req.params.orderId})
        .exec()
        .then(result => {
            if ( !order ) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'Deleted',
                    body: {
                        productId: "ID"
                    }
                }
            })
        })
        .catch(err => {
            err.status(500).json({
                error: err
            })
        })

    // res.status(200).json({
    //     message: 'Deleted order!'
    // })
}