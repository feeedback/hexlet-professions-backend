-- sc: https://ru.hexlet.io/challenges/rdb_basics_students/instance

-- Даны следующие таблицы:

-- Университеты:
-- id	name
-- 1	name1
-- 2	name2
-- 3	name3

-- Студенты:
-- id	name	university_id
-- 1	vASYA	1
-- 2	petya	2
-- 3	misha	2
-- 4	anna	3

-- solution.sql
-- Напишите SQL запрос который найдет имена всех студентов из университета с
-- именем name2. Это значит, что в запросе нужно опираться именно на имя
-- университета, а не делать прямую выборку по id.
-- Запишите запрос в файл solution.sql.

-- CREATE TABLE universities (
--   id bigint PRIMARY KEY,
--   name varchar(255) NOT NULL
-- );

-- CREATE TABLE students (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   name varchar(255) NOT NULL,
--   university_id bigint REFERENCES universities (id) NOT NULL
-- );

-- через подзапросы (не проходили в этом курсе)
SELECT name FROM students
    WHERE university_id=(
        SELECT id FROM universities WHERE name='name2'
    );


SELECT students.name FROM students
    INNER JOIN universities ON students.university_id = universities.id
    WHERE universities.name = 'name2';