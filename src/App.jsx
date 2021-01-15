import React from 'react';


function App() {

  const [timeParts, setTimeParts] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [click, setClick] = React.useState(false);
  const [block, setBlock] = React.useState(false);

  const timeGap = {
    startDay: {
      hours: 8,
      minute: 0,
    },
    endDay: {
      hours: 19,
      minute: 30,
    }
  };

  const timeToString = (hour, minute) => {
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;

    return `${hour}:${minute}`;
  }

  const maketimeParts = (hour, minute, acc = []) => {
    if (hour === timeGap.endDay.hours && minute === timeGap.endDay.minute) {
      setTimeParts(acc);
      return;
    }

    hour = minute === 30 ? hour + 1 : hour;
    minute = minute === 0 ? 30 : 0;

    return maketimeParts(hour, minute, [...acc, { hour, minute }]);
  }

  React.useEffect(() => {
    maketimeParts(timeGap.startDay.hours, timeGap.startDay.minute);
    makeRows();
  }, [])

  const makeRows = () => {
    const rowsParttern = [];

    for (let i = 0; i < 20; i++) {
      const name = i === 0 ? 'ВЪЕЗД' : `ПОСТ №${i}`;
      rowsParttern.push(name);
    }
    setRows(rowsParttern);
  }

  const switchClickMode = (mode) => (e) => {
    if (mode) {
      setBlock(false);
      clearBlock();
    }
    e.preventDefault();
    setClick(mode)
  }

  const clearBlock = () => {
    const activeItems = document.querySelectorAll('.active');
    activeItems.forEach(item => {
      item.classList.remove('active');
    })
  }

  const drawBlock = () => (e) => {
    if (click) {
      e.target.classList.add('active');
    }
    setBlock(true);
  }

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
      <div className="table" onMouseDown={switchClickMode(true)}  onMouseUp={switchClickMode(false)}>
        <div className="row-head row">
          <div className="named-cell cell"></div>
          {timeParts.map(time => (
            <div key={timeToString(time.hour, time.minute)} className="head-cell cell">
              {timeToString(time.hour, time.minute)}
            </div>
          ))}
        </div>
        {rows.map(nameRow => (
          <div key={nameRow} className="row">
            <div className="cell named-cell">{nameRow}</div>
            {timeParts.map(time => {
              const minuteParts = [];
              let minute = time.minute - 5;

              for (let i = 0; i < 6; i++) {
                minute = minute + 5;
                minuteParts.push(minute);
              }

              return (
                <div key={timeToString(time.hour, time.minute)} className="cell empty-cell">
                  {minuteParts.map(part => {
                    const currTime = timeToString(time.hour, part);
                    return (<div
                      key={currTime}
                      onMouseMove={drawBlock()}
                      className="minute-part">&nbsp;</div>)
                  })}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
