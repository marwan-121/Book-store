-- Create bookstore database
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO books (title, author, price, description, image_url) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'A classic novel about the American Dream', 'https://via.placeholder.com/200x300?text=The+Great+Gatsby'),
('To Kill a Mockingbird', 'Harper Lee', 14.50, 'A story about racial injustice and childhood innocence', 'https://via.placeholder.com/200x300?text=To+Kill+a+Mockingbird'),
('1984', 'George Orwell', 11.75, 'A dystopian social science fiction novel', 'https://via.placeholder.com/200x300?text=1984'),
('Pride and Prejudice', 'Jane Austen', 10.25, 'A romantic novel of manners', 'https://via.placeholder.com/200x300?text=Pride+and+Prejudice'),
('The Catcher in the Rye', 'J.D. Salinger', 13.20, 'A controversial novel about teenage angst', 'https://via.placeholder.com/200x300?text=The+Catcher+in+the+Rye');

-- Create users table (if needed for future features)
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table (if needed for future features)
CREATE TABLE IF NOT EXISTS orders (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    order_id INT(11),
    book_id INT(11),
    quantity INT(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
