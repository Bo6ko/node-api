const db = require('../../database/db_connection');
const TABLE = 'users';

const User = {
    getAllUsers: (callback) => {
        const sql = `select * from ${TABLE}`;
        const res = db.query(sql, callback);
    },
    userSignup: (user, callback) => {
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(checkUserQuery, [user.email], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            if (results.length > 0) {
                // User with the same username or email already exists
                callback('User already exists');
                return;
            }
            const insertUserQuery = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
                db.query(insertUserQuery, [user.first_name, user.last_name, user.email, user.password, user.role], (error, results) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, results.insertId);
            });
        });
    },
}

module.exports = User;