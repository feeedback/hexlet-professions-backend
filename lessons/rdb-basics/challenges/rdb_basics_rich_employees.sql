-- sc: https://ru.hexlet.io/challenges/rdb_basics_rich_employees

-- Таблица employees содержит всех работников включая их менеджеров. Каждый
-- работник имеет id и колонку для id менеджера manager_id.
-- id	name	salary	manager_id
-- 1	Joe	70000	3
-- 2	Henry	80000	4
-- 3	Sam	60000	NULL
-- 4	Max	90000	NULL

-- solution.sql
-- Напишите SQL запрос который найдет имена всех работников, которые получают
-- больше чем их менеджеры. Если у работника нет менеджера, они не должны попадать
-- в выборку.
-- Запишите запрос в файл solution.sql.

-- CREATE TABLE employees (
--   id integer,
--   name varchar(10),
--   salary integer,
--   manager_id integer
-- );

-- через подзапросы (не проходили в этом курсе)
SELECT name
    FROM employees AS programmer
    WHERE (manager_id IS NOT NULL) AND (salary > (
        SELECT salary FROM employees WHERE id=programmer.manager_id
    ));

-- из-за связи двух полей JOIN - выдает только те, у которых уже есть менджер, не
-- нужно фильтровать работников без менеджеров

SELECT employees.name
    FROM employees
    JOIN employees AS managers ON employees.manager_id = managers.id
    WHERE employees.salary > managers.salary;