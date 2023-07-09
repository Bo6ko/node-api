const create_users = `CREATE table IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
	password VARCHAR(255),
    role VARCHAR(40),
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP
)`;

module.exports = create_users;