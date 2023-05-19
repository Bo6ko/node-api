const mongoose = require('mongoose');

const Product = require('../models/product')

exports.products_get_all = /*async*/ (req, res, next) => {

    // instead exec():
    // try {
    //     const products = await Product.find();
    //     res.status(200).json(products)
    // } catch(error) {
    //     res.status(500).json({message: error.message})
    // }
    
    Product.find()
        .select('name price _id file')
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                products: docs.map( doc => {
                    return {
                        price: doc.price,
                        file: doc.file,
                        _id: doc._id,
                        request: {
                            type: 'GET'
                        }
                    }
                })
            }
            res.status(200).json(response);

            // old code
            // console.log(docs);
            // res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    // old code
    // res.status(200).json({
    //     message: 'Handling Get requests to /products'
    // })
}

exports.products_create_product = /* async */(req, res, next) => {
    console.log('req.file', req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        file: req.file.path
    });
    //exec() - like promise drugiq na4in e da izvikam callback funct in save(...)
    // another way instead exec() is with async (req, res, next) and await:
    // const Product = await Product.create(req.body)
    // res.status(200).json(product)

    product
        .save()
        .then(result => {
            console.log('result', result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createProduct: result
            })
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json({
                error: err
            })
        });


    // old code
    // res.status(201).json({
    //     message: 'Handling POST requests to /products',
    //     createProduct: product
    // })
}

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id file')
    .exec()
    .then( doc => {
        console.log(doc);
        if ( doc ) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID!' 
            });
        }       
    })
    .catch(err => {
        console.log(err);
        err.status(500).json({error: err})
    })

    // old code
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

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for ( const ops of req.body ) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    // Product.update({_id: id}, {$set: {
    //     name: req.body.newName,
    //     price: req.body.newPrice
    // }})

    //old code
    // res.status(200).json({
    //     message: 'Updated product!'
    // })
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec()
        .then( result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    //old code
    // res.status(200).json({
    //     message: 'Deleted product!'
    // })
}