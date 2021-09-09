const dayjs = require('dayjs');
const { eachDayOfInterval, format, parseISO } = require('date-fns');

const arr1 = [
  { value: 14, date: '02.08.2018' },
  { value: 43, date: '03.08.2018' },
  { value: 38, date: '05.08.2018' },
];
const begin1 = '2018-08-01';
const end1 = '2018-08-06';

console.log();
/**
 * переводит входные данные в удобный для построения графика формат
 *
 * @param {[{value: Number, date: Date}]} arr - массив объектов {value: Int, date: 'DD.MM.YYYY'}
 * @param {Date} beginDate - начало периода (в форме строки 'YYYY-MM-DD')
 * @param {Date} endDate - конец периода (в форме строки 'YYYY-MM-DD')
 * @returns {[{value: Number, date: Date}]}
 */

const normalizeData0 = (arr, beginDate, endDate) => {
  const dataObj = arr.reduce((acc, { value, date }) => ({ ...acc, [date]: value }), {});
  const begin = dayjs(beginDate, 'YYYY-MM-DD').subtract(1, 'day');
  const end = dayjs(endDate, 'YYYY-MM-DD');

  return new Array(end.diff(begin, 'day')).fill({}).map((_, i) => {
    const date = begin.add(i + 1, 'day').format('DD.MM.YYYY');
    const value = dataObj[date] || 0;
    return { value, date };
  });
};

const normalizeData1 = (daysData, beginDate, endDate) => {
  const days = daysData.reduce((acc, { value, date }) => ({ ...acc, [date]: value }), {});
  let now = dayjs(beginDate, 'YYYY-MM-DD').subtract(1, 'day');
  const end = dayjs(endDate, 'YYYY-MM-DD');

  const output = [];
  while (end.diff(now, 'day') > 0) {
    now = now.add(1, 'day');
    const date = now.format('DD.MM.YYYY');
    output.push({ value: days[date] || 0, date });
  }
  return output;
};
const normalizeData2 = (daysData, beginDate, endDate) => {
  const days = new Map();
  daysData.forEach(({ value, date }) => days.set(date, value));
  let now = dayjs(beginDate, 'YYYY-MM-DD').subtract(1, 'day');
  const end = dayjs(endDate, 'YYYY-MM-DD');

  const output = [];
  while (end.diff(now, 'day') > 0) {
    now = now.add(1, 'day');
    const date = now.format('DD.MM.YYYY');
    output.push({ value: days.get(date) || 0, date });
  }
  return output;
};
const normalizeData3 = (data, beginDate, endDate) => {
  const days = new Map();
  data.forEach(({ value, date }) => days.set(date, value));

  const begin = dayjs(beginDate, 'YYYY-MM-DD');
  const period = dayjs(endDate, 'YYYY-MM-DD').add(1, 'day').diff(begin, 'day');

  const output = [];
  for (let i = 0; i < period; i++) {
    const date = begin.add(i, 'day').format('DD.MM.YYYY');
    output.push({ value: days.get(date) || 0, date });
  }
  return output;
};

const normalizeData5 = (data, beginDate, endDate) => {
  const days = new Map();
  data.forEach(({ value, date }) => days.set(date, value));

  const begin = dayjs(beginDate, 'YYYY-MM-DD');
  const period = dayjs(endDate, 'YYYY-MM-DD').add(1, 'day').diff(begin, 'day');

  const output = [];
  for (let i = 0; i < period; i++) {
    const date = begin.add(i, 'day').format('DD.MM.YYYY');
    output.push({ value: days.get(date) || 0, date });
  }
  return output;
};

const normalizeData = (data, beginDate, endDate) => {
  const days = new Map();
  data.forEach(({ value, date }) => days.set(date, value));

  const period = eachDayOfInterval({
    start: new Date(beginDate),
    end: new Date(endDate),
  }).map((d) => format(d, 'dd.MM.yyyy'));

  const createDayField = (date) => ({ value: days.get(date) || 0, date });

  return period.map((day) => createDayField(day));
};

console.log(normalizeData(arr1, begin1, end1));
