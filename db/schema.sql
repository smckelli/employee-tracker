--  Reset and recreate the database if it exists to create fresh data

DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;


-- use the created employeedb database

USE employeedb;

-- The department parameters given for the assignment

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);


-- The role parameters given for the assignment

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

-- The employee parameters given for the assignment

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);
