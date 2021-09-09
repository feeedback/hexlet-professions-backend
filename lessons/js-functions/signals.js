// sc: https://ru.hexlet.io/courses/js-functions/lessons/signals/exercise_unit

// emails.js

// Реализуйте и экспортируйте по умолчанию функцию getFreeDomainsCount, которая принимает
// на вход список емейлов, а возвращает количество емейлов, расположенных на каждом
// бесплатном домене. Список бесплатных доменов хранится в константе freeEmailDomains.

import { countBy } from 'lodash';

const freeEmailDomains = ['gmail.com', 'yandex.ru', 'hotmail.com'];

const getFreeDomainsCount = (emails) => {
  const freeDomains = emails
    .map((email) => {
      const [, domain] = email.split('@');
      return domain;
    })
    .filter((domain) => freeEmailDomains.includes(domain));

  return countBy(freeDomains);
};
export default getFreeDomainsCount;
