import gsap from 'gsap';
import React from 'react';
import classnames from 'classnames';
import * as calendar from './calendar';
import './index.css';

import data from './data';
const holiday = data;

class Calendar extends React.Component {
  static defaultProps = {
    years: [1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    date: new Date(),
    onChange: Function.prototype 
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
    nextMode: 'Год',
    currentMode: 'Месяц'
  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  hideModal = () => {
    const modal = document.querySelector('.modal');
    gsap.to(modal, 0.5, {
      opacity: 0
    });
  }

  handlePrevMonthButtonClick = (mode) => {
    let date = new Date(this.year, this.month);

    if (mode === 'Месяц') {
      if (!(this.month === calendar.Month.January && this.year === this.props.years[0])) {
        date = new Date(this.year, this.month - 1);
        this.hideModal();
      }
    }
    else {
      if (this.year !== this.props.years[0]) {
        date = new Date(this.year - 1, this.month);
        this.hideModal();
      }
    }

    this.setState({ date });
  }

  handleNextMonthButtonClick = (mode) => {
    let date = new Date(this.year, this.month);

    if (mode === 'Месяц') {
      if (!(this.month === calendar.Month.December && this.year === this.props.years[this.props.years.length - 1])) {
        date = new Date(this.year, this.month + 1);
        this.hideModal();
      }
    }
    else {
      if (this.year !== this.props.years[this.props.years.length - 1]) {
        date = new Date(this.year + 1, this.month);
        this.hideModal();
      }
    }

    this.setState({ date });
  }

  handleSelectChange = (mode) => {
    const year = this.yearSelect.value;
    let month;

    if (mode === 'Месяц')
      month = this.monthSelect.value;
    else
      month = this.month;

    const date = new Date(year, month);
    this.setState({ date });

    this.hideModal();
  }

  handleDayClick = (e, date) => {
    const holidayDay = e.target;
    const modal = document.querySelector('.modal');

    if (holidayDay.classList.contains('holiday')) {
      const day = holiday.find(day =>
        (day.date.getMonth() === date.getMonth() &&
          day.date.getDate() === date.getDate())
      );

      modal.innerHTML = day.nameHolidayDay;

      gsap.to(modal, 0.5, {
        opacity: 1
      });
    }
    else {
      gsap.to(modal, 0.5, {
        opacity: 0
      });
    }

    this.setState({
      selectedDate: date
    });

    this.props.onChange(date);
  }

  changeMode = () => {
    const body = document.querySelector('body');

    if (this.state.currentMode === 'Год') {
      body.style.fontSize = '16px';
    }
    else {
      body.style = '';
    }

    this.setState({
      nextMode: this.state.currentMode,
      currentMode: this.state.nextMode
    });
  }

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate, currentMode } = this.state;

    const yearData = calendar.getYearData(this.year);

    let planer;

    if (currentMode === 'Год') {
      planer = (
        <div>
          <table>
            <tbody>
              {yearData.map((monthRow, indexRow) =>
                <tr key={indexRow}>
                  {monthRow.map((month, index) =>
                    <td key={index} className="month">
                      <h2 className="monthname">
                        {monthNames[indexRow * 4 + index]}
                      </h2>
                      <table>
                        <thead>
                          <tr>
                            {weekDayNames.map((name) =>
                              <th key={name}>{name}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {month.map((week, index) =>
                            <tr key={index} className="week">
                              {week.map((date, index) =>
                                date
                                  ? <td key={index}
                                    className={classnames('day', {
                                      'today': calendar.areEqual(date, currentDate),
                                      'selected': calendar.areEqual(date, selectedDate)
                                    }, {
                                      'holiday': calendar.isHoliday(date, holiday)
                                    })}
                                    onClick={(e) => this.handleDayClick(e, date)}
                                  >
                                    {date.getDate()}
                                  </td>
                                  : <td key={index}></td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          <div className="modal"></div>
        </div>
      );
    }
    else {
      const partIndex = Math.floor(this.month / 4);
      const monthIndex = this.month - partIndex * 4;
      const month = yearData[partIndex][monthIndex];

      planer = (
        <div>
          <table key={partIndex} className="month">
            <thead>
              <tr>
                {weekDayNames.map((name) =>
                  <th key={name}>{name}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {month.map((week, index) =>
                <tr key={index} className="week">
                  {week.map((date, index) =>
                    date
                      ? <td key={index}
                        className={classnames('day', {
                          'today': calendar.areEqual(date, currentDate),
                          'selected': calendar.areEqual(date, selectedDate)
                        }, {
                          'holiday': calendar.isHoliday(date, holiday)
                        })}
                        onClick={(e) => this.handleDayClick(e, date)}
                      >
                        {date.getDate()}
                      </td>
                      : <td key={index}></td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          <div className="modal"></div>
        </div>
      );
    }

    return (
      <div className="calendar">
        <button className="mode-button" onClick={this.changeMode}>
          {this.state.nextMode}
        </button>
        <header className="header">
          <button onClick={() => this.handlePrevMonthButtonClick(currentMode)}>{'<'}</button>
          {currentMode === 'Месяц'
            ? <select
              onChange={() => this.handleSelectChange(currentMode)}
              ref={element => this.monthSelect = element}
              value={this.month}
            >
              {monthNames.map((name, index) =>
                <option key={name} value={index}>{name}</option>
              )}
            </select>
            : null
          }
          <select
            onChange={() => this.handleSelectChange(currentMode)}
            ref={element => this.yearSelect = element}
            value={this.year}
          >
            {years.map((year) =>
              <option key={year} value={year}>{year}</option>
            )}
          </select>
          <button onClick={() => this.handleNextMonthButtonClick(currentMode)}>{'>'}</button>
        </header>
        {planer}
      </div>
    );
  }
}

export default Calendar;