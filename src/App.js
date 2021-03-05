import React from 'react';
import Calendar from './components/Calendar';

class App extends React.Component {
  state = {
    date: null // храним текущую дату, на которую кликнули
  };

  handleDateChange = (date) => {
    this.setState({ date });
  }

  render() {
    return (
      <div>
        <Calendar
          onChange={this.handleDateChange}
        />
      </div>
    );
  }
}

export default App;
