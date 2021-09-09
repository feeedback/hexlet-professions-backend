// sc: https://ru.hexlet.io/courses/js-arrays/lessons/control-statements/exercise_unit#

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход в виде массива
// кошелёк с деньгами и название валюты и возвращает сумму денег указанной валюты.

// Реализуйте данную функцию используя управляющие инструкции.

// Параметры функции:
// Массив, содержащий купюры разных валют с различными номиналами
// Наименование валюты

const getTotalAmount = (wallet, currency) => {
  const getName = (bill) => bill.slice(0, 3);
  const getValue = (bill) => Number(bill.slice(4));

  const getCurrencyValue = (bill) => (getName(bill) === currency ? getValue(bill) : 0);

  return wallet.reduce((sum, bill) => sum + getCurrencyValue(bill), 0);
};

// export default getTotalAmount;

const money2 = ['eur 10', 'usd 1', 'eur 5', 'rub 100', 'eur 20', 'eur 100', 'rub 200'];
console.log(getTotalAmount(money2, 'eur')); // 135
