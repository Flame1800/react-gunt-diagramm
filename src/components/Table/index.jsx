import React from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions/index.js";

import CurrOrder from './CurrOrder'
import Order from './Order'
import Row from './Parts/Row'
import Cell from './Parts/Cell'
import timeToString from '../../functions/timeToString'
import getCurrTime from '../../functions/getCurrTime'

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts,
        currOrder: state.currOrder,
        orders: state.orders,
        rows: state.rows,
        rowCoords: state.rowCoords,
        timeCoords: state.timeCoords,
    }
}

const actionCreators = {
    setTimeParts: actions.setTimeParts,
    setTimeNow: actions.setTimeNow,
    setRows: actions.setRows
};

function Table(props) {

    console.log('rerender')

    const {
        currOrder,
        timeParts,
        orders,
        setTimeNow,
        setRows,
        rows,
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
        makeRows()
        getTime()
    }, [])

    const dataFrom1C = document.getElementById('data-for-react')
    dataFrom1C.addEventListener('click', () => {
        if (dataFrom1C.dataset.posts) {
            makeRows(dataFrom1C.dataset.posts)
        }
    })

    const getTime = () => {
        setTimeNow(getCurrTime())
        setTimeout(getTime, 300000)
    }

    const maketimeParts = (hour, minute, acc = []) => {
        if (hour === timeGap.endDay.hours && minute === timeGap.endDay.minute) {
            props.setTimeParts({ parts: acc });
            return;
        }

        hour = minute === 30 ? hour + 1 : hour
        minute = minute === 0 ? 30 : 0

        return maketimeParts(hour, minute, [...acc, { hour, minute }])
    }

    const makeRows = (posts = []) => {
        if (posts.length <= 0) {
            const rowsParttern = [];

            for (let i = 0; i < 20; i++) {
                const name = i === 0 ? 'ВЪЕЗД' : `№${i}`
                const row = {
                    id: i,
                    name
                }
                rowsParttern.push(row)
            }
            setRows(rowsParttern)

        }
        else {
            setRows(JSON.parse(posts))
        }
    }

    return (
        <div className="table">
            {currOrder !== null &&
                <CurrOrder currOrder={currOrder} />}
            {orders.length > 0 && orders.map(item =>
                <Order item={item} />)}

            <div className="row-head row">
                <div className="named-cell cell"></div>
                {timeParts.map(time => {
                    return (
                        <div key={Math.random()} className="head-cell cell">
                            {timeToString(time.hour, time.minute)}
                        </div>
                    )
                })}
            </div>
            {rows.map((row, i) => {
                return (<Row key={Math.random()} row={row} i={i} />)
            })}
            <div className="row-head row-coords row">
                <div className="named-cell cell"></div>
                {timeParts.map(time => <Cell
                    key={Math.random()} time={time} mode='coords' />)}
            </div>
        </div>
    )
}


const connComponent = connect(mapPropsToState, actionCreators)(Table);
export default connComponent