DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB; 

USE employee_trackerDB; 

CREATE TABLE department(
id INTEGER AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id int,
PRIMARY KEY (id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id int,
PRIMARY KEY (id),
FOREIGN KEY(role_id) REFERENCES role(id)
);