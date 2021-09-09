// sc:
// https://ru.hexlet.io/courses/js-polymorphism/lessons/dependency-inversion/exercise_unit

// Создайте полноценное консольное приложение, которое показывает текущую погоду в городе.
// Оно работает так:

// $ npx babel-node bin/weather.js berlin
// Temperature in berlin: 26C
// Это консольное приложение обращается внутри себя к сервису погоды. Сервис погоды
// расположен на localhost:8080. Информацию по городу можно извлечь сделав GET запрос на
// урл /api/v2/cities/<имя города>. Данные от сервиса возвращаются в виде json: { "name":
// "<имя города>", temperature: "<температура>" }.

// src\WeatherService.js
// Реализуйте логику работы сервиса. Сделайте так, чтобы http-клиент не был зашит внутри
// класса, используйте инъекцию зависимостей для проброса клиента во внутрь.

// То как выполнять http-запросы через axios можно подсмотреть в его документации.

// bin/weather.js
// Реализуйте код, вызывающий сервис и печатающий на экран ожидаемую строку. Для
// извлечения города из аргументов командной строки, воспользуйтесь свойством argv
// глобального объекта process. Первый аргумент (передаваемое имя города) находится под
// индексом 2. Посмотреть описание и пример можно в документации.

// Подсказки
// Попробуйте ответить на вопросы:

// Сервис погоды это абстракция данных или нет?
// Кто отвечает за формирование текста, который мы ожидаем на выходе?
// Может ли bin содержать определения?

// src\WeatherService.js
import { resolve } from 'url';

// BEGIN (write your solution here)
export default class WeatherService {
  constructor(urlAPI, httpClient) {
    this.api = urlAPI;
    this.httpClient = httpClient;
  }

  async get(city) {
    try {
      const response = await this.httpClient.get(`${this.api}${city}`);
      const weather = JSON.parse(response.data);
      return [null, weather];
    } catch (error) {
      return [error];
    }
  }
}
// END

// bin/weather.js

// BEGIN (write your solution here)
(async () => {
  const cityName = process.argv[2];
  const weatherService = new WeatherService('http://localhost:8080/api/v2/cities/', axios);
  const [err, weatherCity] = await weatherService.get(cityName);
  if (err) {
    throw err;
  }
  const message = `Temperature in ${cityName}: ${weatherCity.temperature}C`;
  console.log(message);
})();
// END
