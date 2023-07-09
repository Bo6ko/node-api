const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getAll = (req, res, next) => {
    User.getAll((err, results) => {
        if(err) {
            console.log('Error retrieving users:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.signup = (req, res, next) => {
    const user = req.body;

    // Perform email validation
    if (!isValidEmail(user.email)) {
        res.status(400).json({ error: 'Invalid email' });
        return;
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if ( err ) {
            return res.status(500).json({
                error: err
            });
        } else {
            user.password = hash
            User.signup(user, (err, results) => {
                if(err) {
                    console.error('Error creating user: ', err);
                    //409 means conflict or 422 - for example if email exists
                    res.status(500).json({ error: 'Failed to create user' });
                } else {
                    const newUser = {...{id: results}, ...user};
                    res.status(201).json(newUser);
                }
            });
        }
    })
}

exports.login = (req, res, next) => {
    const user = req.body;
    User.login(user, (err, results) => {
        if(err) {
            console.error('User don\'t exists: ', err);
            res.status(500).json({ error: 'User don\'t exists' });
        } else {
            if ( results.length < 1 ) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(user.password, results[0].password, (err, result) => {
                if ( result ) {
                    // https://jwt.io/ - you can read the token information
                    const token = jwt.sign(
                        {
                            id: results[0].id,
                            email: results[0].email,                            
                            role: results[0].role
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                return res.status(200).json({
                    message: 'Auth failed'
                })
            });
        }
    });
}

exports.delete = (req, res, next) => {
    const params = req.params;
    User.delete(params, (err, results) => {
        if(err) {
            console.log('Error: ', err);
            res.status(500).json(err);
        } else {
            console.log(results)
            res.status(200).json(results);
        }
    })
}

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};