import dateHoliday from './dateHoliday.js';

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

let holiday = [];

dateHoliday.forEach( month => {

  const name = month.name;
  const indexMonth = monthNames.findIndex( month => month === name);

  month.celebration.forEach( holidayDay => {
    const nameHolidayDay = holidayDay.name;
    const numberDay = holidayDay.day;

    const date = new Date(2020, indexMonth, numberDay);

    holiday.push({
      date,
      nameHolidayDay
    });
  });
});

export default holiday;

