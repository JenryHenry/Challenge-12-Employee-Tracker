
INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Marketing"),
        ("HR"),
        ("Legal");

INSERT INTO role (title, department, salary)
VALUES ("Data Analyst", 1, 100000),
        ("Marketing Director", 2, 150000),
        ("Employee Relations", 3, 100000),
        ("Chief Legal Officer", 4, 150000),
        ("Risk Management", 4, 95000),
        ("Customer Relations", 3, 100000),
        ("Accounts Manager", 1, 135000),
        ("Chief Relations Officer", 3, 130000);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tom", "King", 2),
        ("Mary", "Isley", 1),
        ("Balthazar", "Flamington", 3),
        ("Bob", "Renfield", 5),
        ("Stella", "Green", 4),
        ("Patrick", "Miller", 6),
        ("Franella", "Thistle", 7),
        ("Gabe", "Lightfoot", 8);

UPDATE employee
SET manager_id = 8
WHERE id = 3;

UPDATE employee
SET manager_id = 5
WHERE id = 5;

UPDATE employee
SET manager_id = 7
WHERE id = 1;

UPDATE employee
SET manager_id = 8
WHERE id = 6;