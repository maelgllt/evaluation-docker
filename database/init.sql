CREATE DATABASE IF NOT EXISTS image_favorites;
USE image_favorites;

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageUrl VARCHAR(255) NOT NULL,
    description TEXT
);