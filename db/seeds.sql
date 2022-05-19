USE employeedb;

INSERT INTO department (name)
VALUES ("Operations");
INSERT INTO department (name)
VALUES ("Technicians");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Support Staff");
INSERT INTO department (name)
VALUES ("Leadership");

INSERT INTO role (title, salary, department_id)
VALUES ("Laborer", 45000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Explosives Specialist", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 130000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Equipment Specialist", 55000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 185000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Supervisor", 68000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Secretary", 45000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead", 55000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bullwinkle", "Moose", 8, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rocket (Rocky)", "Squirrel", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Boris", "Badenov", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Natasha", "Fatale", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fearless", "Leader", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("H.R.", "Pufnstuf", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wilhelmina", "Witchiepoo", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cass", "Elliot", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jimmy", "", 1, 3);
