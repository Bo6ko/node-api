const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.getAllUsers((err, results) => {
        if(err) {
            console.log('Error retrieving users:', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    })
}

exports.userSignup = (req, res, next) => {
    const user = req.body;

    // Perform email validation
    if (!isValidEmail(user.email)) {
        res.status(400).json({ error: 'Invalid email' });
        return;
    }

    User.userSignup(user, (err, results) => {
        if(err) {
            console.error('Error creating user: ', err);
            //409 means conflict or 422 - for example if email exists
            res.status(500).json({ error: 'Failed to create user' });
        } else {
            const newUser = {...{id: results}, ...user};
            res.status(201).json(newUser);
        }
    })
}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if ( user.length < 1 ) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if ( err ) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if ( result ) {
                // https://jwt.io/ - you can read the token information
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role
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
    })
    .catch(err => {
        console.log('err', err);
        res.status(500).json({
            error: err
        })
    });
}

exports.user_delete = (req, res, next) => {
    // User.deleteMany() delete all
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then( result => {
            res.status(200).json({
                message: "User deleted"
            })
        } )
        .catch(err => {
            console.log('err', err);
            res.status(500).json({
                error: err
            })
        });
}

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};