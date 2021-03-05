// вспомогательные константы и функции
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  Ocnober: 9,
  November: 10,
  December: 11
};
const MONTH_ROWS = 3;
const MONTH_COLUMNS = 4;

export function areEqual(a, b) {
  if (!a || !b) return false;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isHoliday(a, holiday) {
  if (!a || !holiday) return false;

  return holiday.some( day => 
    day.date.getMonth() === a.getMonth() &&
    day.date.getDate() === a.getDate()
  );
}

export function isLeapYear(year) {
  return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = DAYS_IN_MONTH[month];

  if (isLeapYear(year) && month === Month.February) {
    return daysInMonth + 1;
  }
  else {
    return daysInMonth;
  }
}

export function getDayOfWeek(date) {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0)
    return 6;

  return dayOfWeek - 1;
}

export function getMonthData(year, month) {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || (day > daysInMonth)) {
        result[i][j] = undefined;
      }
      else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}

export function getYearData(year) {
  const result = [];
    let month = 0;

    for (let i = 0; i < MONTH_ROWS; i++) {
      result[i] = [];

      for (let j = 0; j < MONTH_COLUMNS; j++) { 
        result[i][j] = getMonthData(year, month++);
      }
    }

  return result;
}