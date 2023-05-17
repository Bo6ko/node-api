const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
//initialise
//dest - kyde da se uploudva
const upload = multer({dest: 'uploads/'});

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    
    Product.find()
        .select('name price _id')
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs);
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
});

// upload.single('productImage') just one file to upload
router.post('/', upload.single('file'), (req, res, next) => {
    console.log('req.file', req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //exec() - like promise drugiq na4in e da izvikam callback funct in save(...)
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
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
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
});

router.patch('/:productId', (req, res, next) => {
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
});

router.delete('/:productId', (req, res, next) => {
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
});

module.exports = router;