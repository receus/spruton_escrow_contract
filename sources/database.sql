CREATE DATABASE contract;

USE contract;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId BIGINT NOT NULL,
    reward BIGINT NOT NULL,
    quantity BIGINT NOT NULL
);

//node server.js
