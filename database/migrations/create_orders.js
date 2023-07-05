const create_orders = `CREATE table IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id int,
    quantity int DEFAULT 1,
	created_at DATETIME,
	updated_at TIMESTAMP,
    CONSTRAINT FK_Product_Orders FOREIGN KEY (product_id)
    REFERENCES Products(id)
)`;

module.exports = create_orders;