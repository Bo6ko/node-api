const mongoose = require('mongoose');

const Product = require('../models/product')

exports.getAllByUserId = (req, res, next) => {
    Product.getAllByUserId(req.userData, (err, results) => {
        if(err) {
            console.log('Error retrieving products:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.getById = (req, res, next) => {
    Product.getById(req.params, req.userData, (err, results) => {
        if(err) {
            console.log('Error retrieving products:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.create = (req, res, next) => {
    const product = req.body;
    Product.create(req, (err, results) => {
        if(err) {
            console.error('Error creating product: ', err);
            res.status(500).json({ error: 'Failed to create product' });
        } else {
            const newProduct = {
                ...{id: results}, 
                ...{user_id: req.userData.id}, 
                ...{file: (req.file && req.file.path) ? req.file.path : ''}, 
                ...product
            };
            res.status(201).json(newProduct);
        }
    });
}

exports.update = (req, res, next) => {
    const product = req.body;
    Product.update(req, (err, results) => {
        if(err) {
            console.error('Error updating product: ', err);
            res.status(500).json({ error: 'Failed to update product' });
        } else {
            const newProduct = {
                ...{id: req.params.id}, 
                ...{user_id: req.userData.id}, 
                ...{file: (req.file && req.file.path) ? req.file.path : ''}, 
                ...product
            };
            res.status(201).json(newProduct);
        }
    });
}

exports.delete = (req, res, next) => {
    Product.delete(req, (err, results) => {
        if(err) {
            console.log('Error: ', err);
            res.status(500).json(err);
        } else {
            console.log(results)
            res.status(200).json(results);
        }
    })
}