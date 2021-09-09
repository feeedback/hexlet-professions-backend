// sc: https://ru.hexlet.io/courses/js-express/lessons/routing/exercise_unit

// Ваше первое express приложение, будет представлять из себя простой счетчик, с
// доступом через http интерфейс. Над счетчиком можно выполнять следующие
// операции:

// / - получить текущее значение счетчика в виде json: { "value": 0 }
// <METHOD> /increment - увеличение на единицу
// <METHOD> /decrement - уменьшение на единицу
// <METHOD> /reset - сброс значения счетчика на значение по умолчанию.
// <METHOD> /set?value=5 - установка счетчика в конкретное значение, которое
// передается как query параметр с именем value.
// Значение по умолчанию равно нулю. Все точки входа, кроме /, должны возвращать
// 204 no content.

// Имена методов не указаны специально. Необходимо их выбрать правильно с учетом
// требований http к семантике глаголов. Важно анализировать идемпотентность
// операции и требований по обеспечению идемпотентности глаголами http.

// solution.js
// Реализуйте функцию, которая возвращает сконфигурированное express приложение по
// приведенному выше сценарию.

import Express from 'express';

export default () => {
  // BEGIN (write your solution here)
  const DEFAULT_VALUE = 0;
  const counter = { value: DEFAULT_VALUE };

  const app = new Express();
  app.get('/', (req, res) => {
    res.json(counter);
  });
  app.put('/set', (req, res) => {
    const { value } = req.query;
    counter.value = Number(value);
    res.sendStatus(204);
  });
  app.post('/increment', (req, res) => {
    counter.value += 1;
    res.sendStatus(204);
  });
  app.post('/decrement', (req, res) => {
    counter.value -= 1;
    res.sendStatus(204);
  });
  app.delete('/reset', (req, res) => {
    counter.value = DEFAULT_VALUE;
    res.sendStatus(204);
  });
  // END

  return app;
};
