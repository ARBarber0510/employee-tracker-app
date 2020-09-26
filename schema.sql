DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB; 

USE employee_trackerDB; 

-- DEPARTMENT TABLE
CREATE TABLE department(
id INTEGER AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(30),
PRIMARY KEY (id)
);

-- ROLE TABLE
CREATE TABLE role(
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

-- EMPLOYEE TABLE
CREATE TABLE employee(
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY(role_id) REFERENCES role(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;