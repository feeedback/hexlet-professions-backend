-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/relations/exercise_unit

-- Создайте таблицу cars со следующими полями:
-- user_first_name - имя пользователя (соответствующее имени в таблице users)
-- brand - марка машины
-- model - конкретная модель

-- Добавьте в таблицу users две произвольные записи.
--  Сама таблица добавляется в базу данных автоматически (смотрите файл init.sql)

-- Добавьте в таблицу cars 5 произвольных записей.
--  Две из них должны указывать на одного пользователя (соответствие по имени пользователя), а три других - на другого.

CREATE TABLE cars (
    first_name varchar(255),
    brand varchar(255),
    model varchar(255)
);

INSERT INTO users VALUES ('User1', 'User1', '1832-10-10');
INSERT INTO users VALUES ('User2', 'User2', '1832-10-11');

INSERT INTO cars VALUES
    ('User1', 'car1', '-'),
    ('User1', 'car2', '-');
INSERT INTO cars VALUES
    ('User2', 'car1', '-'),
    ('User2', 'car2', '-'),
    ('User2', 'car3', '-');

