-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/sql-dql/exercise_unit

SELECT * FROM users
  WHERE birthday > '1999-10-23'
  ORDER BY first_name
  LIMIT 3;