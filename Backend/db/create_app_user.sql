-- create_app_user.sql
-- This script creates a non-root app user and grants privileges to the 'test' database.
-- Replace password placeholder with your own secure password.

CREATE DATABASE IF NOT EXISTS test;
USE test;

-- Create an application user and grant privileges
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'swikriti@123';
GRANT ALL PRIVILEGES ON test.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;

-- For systems where IDENTIFIED BY doesn't work for MySQL 8 or changed auth, you can run:
-- ALTER USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'swikriti@123';
-- FLUSH PRIVILEGES;
