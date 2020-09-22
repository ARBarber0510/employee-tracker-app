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

-- DEPARTMENT SEEDS
INSERT INTO department (dept_name)
VALUE ("Finance");
INSERT INTO department (dept_name)
VALUE ("Sales");
INSERT INTO department (dept_name)
VALUE ("Engineering");
INSERT INTO department (dept_name)
VALUE ("Operations");

-- ROLE SEEDS
INSERT INTO role(title, salary, department_id)
VALUE("Director of Sales", 200000, 2);
INSERT INTO role(title, salary, department_id)
VALUE("Director of Engineering", 150000, 3);
INSERT INTO role(title, salary, department_id)
VALUE("Operations Manager", 50000, 4);
INSERT INTO role(title, salary, department_id)
VALUE("Finance Coordinator", 45000, 1);

-- EMPLOYEE SEEDS
INSERT INTO employee(first_name, last_name, manager_id, role_id)
VALUE("Crawford", "Tillinghast", null, 4);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
VALUE("Katherine", "McMichaels", null, 2);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
VALUE("Edward", "Pretorius", 1, 3);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
VALUE("Bubba", "Brownless", 3, 1);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;