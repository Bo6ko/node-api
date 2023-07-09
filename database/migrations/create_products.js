const create_users = `CREATE table IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id SMALLINT null,
    barcode VARCHAR(80) NOT NULL UNIQUE,
    name VARCHAR(80) NOT NULL,
    price DECIMAL(10,2),
    quantity DECIMAL(10,2),
    file_path VARCHAR(255),
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP,
    CONSTRAINT FK_Users_Products FOREIGN KEY (user_id)
    REFERENCES Users(id)
)`;

module.exports = create_users;