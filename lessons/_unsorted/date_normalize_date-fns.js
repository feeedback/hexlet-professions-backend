import { eachDayOfInterval, format } from 'date-fns';

// BEGIN (write your solution here)
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
export default normalizeData;
// END
