// sc: https://ru.hexlet.io/challenges/js_functions_ipv6_validator/instance

// validator.js
// Реализуйте функцию-предикат isValidIPv6, которая проверяет IPv6-адреса (адреса
// шестой версии интернет протокола) на корректность. Функция принимает на вход
// строку с адресом IPv6 и возвращает true, если адрес корректный, а в противном
// случае false. Экспортируйте функцию по умолчанию.

// Дополнительные условия:

// Работа функции не зависит от регистра символов.
// Ведущие нули в группах цифр необязательны.

// Самая длинная последовательность групп нулей, например, :0:0:0: может быть
// заменена на два двоеточия ::. Такую замену можно произвести только один раз.
// Одна группа нулей :0: не может быть заменена на ::.

// Примеры
// isValidIPv6('10:d3:2d06:24:400c:5ee0:be:3d'); // true
// isValidIPv6('0B0:0F09:7f05:e2F3:0D:0:e0:7000'); // true
// isValidIPv6('000::B36:3C:00F0:7:937'); // true
// isValidIPv6('::1'); // true

// isValidIPv6('2607:G8B0:4010:801::1004'); // false
// isValidIPv6('1001:208:67:4f00:e3::2c6:0'); // false
// isValidIPv6('2.001::'); // false
// isValidIPv6('9f8:0:69S0:9:9:d9a:672:f90d'); // false

// Подсказки
// IPv6 WIKI
// Для проверки пограничных случаев внимательно изучите список IP-адресов в модуле
// с тестами.

// восемь групп по четыре символа
// 2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d

// import _ from 'lodash';

// BEGIN (write your solution here)

const IS = (ipv6) => {
  let groups = ipv6.split(':');
  console.log(groups);
  const notEmptyGroupsLength = groups.filter((group) => group !== '').length;
  console.log(notEmptyGroupsLength);

  const str = ipv6.replace(
    /(?<=[\dABCDEF])::/i,
    ':0000:0000'.concat(':0000'.repeat(6 - notEmptyGroupsLength))
  );
  // НЕ ОБРАБАТЫВАЕТ СЛУЧАИ, КОГДА ГРУППЫ (ЦИФРЫ) ЕСТЬ СЛЕВА ИЛИ СПРАВА ОТ ::

  // const str = ipv6.replace(
  //     /(?<=[\dABCDEF])::/i,
  //     '0000:0000'.concat(':0000'.repeat(6 - notEmptyGroupsLength))
  // );
  // const str = ipv6.replace(
  //     '::',
  //     '0000:0000'.concat(':0000'.repeat(6 - notEmptyGroupsLength))
  // );

  console.log(str);
  groups = str.split(':');
  console.log(groups);
  if (groups.length !== 8) {
    return false;
  }

  if (groups.some((group) => group === '')) {
    return false;
  }
  groups = groups.map((group) => group.padStart(4, '0'));
  console.log(groups);
  if (groups.some((group) => !/^[\dABCDEF]{4}$/gi.test(group))) {
    return false;
  }

  return true;
};

console.log(IS('1::1'));
// ::
// from 2 to 8 group 0000
// 0=>6,

// END
