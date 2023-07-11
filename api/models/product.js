const db = require('../../database/db_connection');
const TABLE = 'products';

const Product = {
    getAllByUserId: (user, callback) => {
        const sql = `select * from ${TABLE} where user_id = ?`;
        db.query(sql, [user.id], callback);
    },
    getById: (product, user, callback) => {
        const sql = `select * from ${TABLE} where user_id = ? and id = ?`;
        db.query(sql, [user.id, product.id], callback);
    },
    create: (data, callback) => {
        const product = data.body;
        const user = data.userData;
        const file = (data.file && data.file.path) ? data.file.path : '';
        const insertUserQuery = `INSERT INTO ${TABLE} (user_id, barcode, name, price, quantity, file) VALUES (?, ?, ?, ?, ?, ?) `;
        db.query(insertUserQuery, [user.id, product.barcode, product.name, product.price, product.quantity, file], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, results.insertId);
        });
    },
    update: (data, callback) => {
        const product = data.body;
        const user = data.userData;
        const file = (data.file && data.file.path) ? data.file.path : '';
        const updateUserQuery = `UPDATE ${TABLE} SET name = ?, price = ?, quantity = ?, file = ? WHERE id = ? and user_id = ?`;
        db.query(
            updateUserQuery, 
            [product.name, product.price, product.quantity, file, product.id, user.id], 
            (error, results) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, product);
            }
        );
    },
    delete: (data, callback) => {
        const productId = data.params.id;
        const deleteProduct = `DELETE FROM ${TABLE} WHERE id = ? and user_id = ?;`;
        db.query(deleteProduct, [productId, data.userData.id], (error, results) => {
            if (error) {
                callback(error);
                return;
            } 
            callback(null, {message: `product id ${productId} was deleted!`})
        });
    },
}

module.exports = Product;