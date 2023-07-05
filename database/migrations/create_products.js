const create_users = `CREATE table IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(80) NOT NULL,
    price DECIMAL(10,2),
	created_at DATETIME,
	updated_at TIMESTAMP,
    CONSTRAINT FK_Users_Products FOREIGN KEY (user_id)
    REFERENCES Users(id)
)`;

module.exports = create_users;