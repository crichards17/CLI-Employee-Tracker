DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE department( 
department_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR (30) NOT NULL
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

CREATE TABLE role (
roleID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR (30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT,
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales", 90000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Order Processing", 60000,3);
INSERT INTO role (title, salary, department_id)
VALUES ("CPA", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Paralegal", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

CREATE TABLE employee(
employeeID INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR (30) NOT NULL,
lastName VARCHAR (30) NOT NULL,
roleID INT,
managerID INT NULL,
CONSTRAINT fk_role FOREIGN KEY (roleID) REFERENCES role(roleID) ON DELETE SET NULL,
CONSTRAINT fk_manager FOREIGN KEY (managerID) REFERENCES employee(employeeID) ON DELETE CASCADE
);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ("Cameron", "Richards", 1, null);
INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ("Test", "Test2", 2, null);