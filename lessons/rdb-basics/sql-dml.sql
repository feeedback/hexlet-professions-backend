-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/sql-dml/exercise_unit

DELETE FROM users WHERE first_name = 'Sansa';
INSERT INTO users VALUES ('Arya', 'arya@winter.com');
UPDATE users SET manager = TRUE WHERE email = 'tirion@got.com';