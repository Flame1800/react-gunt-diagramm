import React from 'react';


function App() {

  const [timeGap, setTimeGap] = React.useState({
    startDay: {
      hours: 8,
      minute: 0,
    },
    endDay: {
      hours: 19,
      minute: 30,
    }
  });
  const [colls, setColls] = React.useState([]);

  const timeToString = (hour, minute) => {
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;

    return `${hour}:${minute}`;
  }

  const makeColls = (hour, minute) => {
    if (hour === timeGap.endDay.hours + 1 && minute === timeGap.endDay.minute - 30) {
      console.log(colls);
      return;
    }

    hour = minute === 30 ? hour + 1 : hour;
    minute = minute === 0 ? 30 : 0;
    setColls([...colls, timeToString(hour, minute)]);

    return makeColls(hour, minute);
  }

  React.useEffect(() => {
    makeColls(timeGap.startDay.hours, timeGap.startDay.minute);
  }, [])


  return (
    <div className="App">
      <div className="head">
        <div className="switch-day">
          <div className="curr-value">Сегодня</div>
          <div className="prev switch-btn">Пред.</div>
          <div className="next switch-btn">След.</div>
        </div>
        <div className="date">14 янв. 2020</div>
      </div>
      <div className="table">
        <div className="row-head row">
          <div className="white-space"></div>
          {colls.map(value => (
            <div key={value} className="coll">{value}</div>
          ))}
        </div>
        <div className="row">

        </div>
      </div>
    </div>
  );
}

export default App;
