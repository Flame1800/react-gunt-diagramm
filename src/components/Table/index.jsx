import React from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions/index.js";


import Row from './Parts/Row'
import Cell from './Parts/Cell'
import timeToString from '../../functions/timeToString'
import getCurrTime from '../../functions/getCurrTime'
import Orders from './Orders'

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts,
        currOrder: state.currOrder,
        rows: state.rows,
        rowCoords: state.rowCoords,
        tableState: state.tableState
    }
}

const actionCreators = {
    setTimeParts: actions.setTimeParts,
    setTimeNow: actions.setTimeNow,
    setRows: actions.setRows,
    clearOrders: actions.clearOrders
};

function Table(props) {
    const {
        currOrder,
        timeParts,
        setTimeNow,
        setRows,
        rows,
        tableState
    } = props

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

    React.useEffect(() => {
        maketimeParts(timeGap.startDay.hours, timeGap.startDay.minute)
        getTime()

        const dataFrom1C = document.getElementById('data-for-react')
        dataFrom1C.addEventListener('click', () => {
            if (dataFrom1C.dataset.locations) {
                setRows(JSON.parse(dataFrom1C.dataset.locations))
            }
        })
    }, [])

    const getTime = () => {
        setTimeNow(getCurrTime())
        setTimeout(getTime, 300000)
    }

    // Перезагрузка страницы при изменении размера окна, для адаптивности блоков с заказами
    // window.addEventListener('resize', () => window.location.reload())

    const maketimeParts = (hour, minute, acc = []) => {
        if (hour === timeGap.endDay.hours && minute === timeGap.endDay.minute) {
            props.setTimeParts({ parts: acc });
            return;
        }

        hour = minute === 30 ? hour + 1 : hour
        minute = minute === 0 ? 30 : 0
        return maketimeParts(hour, minute, [...acc, { hour, minute }])
    }

    const classesTable = tableState === 'active' ? 'table active-table' : 'table' 

    return (
        <div className={classesTable}>
            <Orders />
            <div className="row-head row">
                <div className="named-cell cell"></div>
                {timeParts.map(time => (
                    <div key={Math.random()} className="head-cell cell">
                        {timeToString(time.hour, time.minute)}
                    </div>
                ))}
            </div>
            {rows.map((row, i) => (<Row key={Math.random()} row={row} i={i} />))}
            <div className="row-head row-coords row">
                <div className="named-cell cell"></div>
                {timeParts.map(time => <Cell key={Math.random()} time={time} mode='coords' />)}
            </div>
        </div>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(Table);
export default connComponent
