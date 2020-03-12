import dayjs from 'dayjs';

// BEGIN (write your solution here)
const normalizeData = (data, beginDate, endDate) => {
    const days = new Map();
    data.forEach(({ value, date }) => days.set(date, value));

    const begin = dayjs(beginDate, 'YYYY-MM-DD');
    const period = dayjs(endDate, 'YYYY-MM-DD')
        .add(1, 'day')
        .diff(begin, 'day');

    const output = [];
    for (let i = 0; i < period; i++) {
        const date = begin.add(i, 'day').format('DD.MM.YYYY');
        output.push({ value: days.get(date) || 0, date });
    }
    return output;
};
// END
