const db = require('../../database/db_connection');
const TABLE = 'orders';

const Order = {
    getAllByUserId: (user, callback) => {
        const sql = `select o.* from ${TABLE} as o left join products as p ON p.id = o.product_id where p.user_id = ?`;
        db.query(sql, [user.id], callback);
    },
    getAllByProductId: (user, callback) => {
        // const sql = `select * from ${TABLE} where user_id = ?`;
        // db.query(sql, [user.id], callback);
    },
    getById: (product, user, callback) => {
        const sql = `select o.* from ${TABLE} as o left join products as p ON p.id = o.product_id where p.user_id = ? and o.id = ?`;
        db.query(sql, [user.id, product.id], callback);
    },
    create: (order, callback) => {
        const insertUserQuery = `INSERT INTO ${TABLE} (product_id, quantity) VALUES (?, ?) `;
        db.query(insertUserQuery, [order.product_id, order.quantity], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, results.insertId);
        });
    },
    update: (order, user, callback) => {
        const updateOrderQuery = `UPDATE ${TABLE} AS o left join products as p ON p.id = o.product_id  SET o.quantity = ? where o.id = ? and p.user_id = ?`;
        db.query(
            updateOrderQuery, 
            [order.quantity, order.id, user.id], 
            (error, results) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, results);
            }
        );
    },
    delete: (data, callback) => {
        const orderId = data.params.id;
        const deleteOrder = `DELETE o FROM ${TABLE} as o left join products as p ON p.id = o.product_id WHERE o.id = ? and p.user_id = ?`;
        db.query(deleteOrder, [orderId, data.userData.id], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, {message: `order id ${orderId} was deleted!`})
        });
    },
}

module.exports = Order;