import React from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions/index.js";

import CurrOrder from './CurrOrder'
import Order from './Order'
import Row from './Parts/Row'
import timeToString from '../../functions/timeToString'
import getCurrTime from '../../functions/getCurrTime'

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts,
        currOrder: state.currOrder,
        click: state.click,
        orders: state.orders
    }
}

const actionCreators = {
    setCurrOrder: actions.setCurrOrder,
    setTimeParts: actions.setTimeParts,
    setClick: actions.setClick,
    setOrders: actions.setOrders,
    setTimeNow: actions.setTimeNow
};

function Table(props) {
    const [rows, setRows] = React.useState([])

    const { currOrder, timeParts, click, setClick, orders, setOrders, setTimeNow } = props
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

        const dataFrom1C = document.getElementById('data-for-react')

        dataFrom1C.addEventListener('click', () => {
            if (dataFrom1C.dataset.posts) {
                makeRows(dataFrom1C.dataset.posts)
            }
        })

    }, [])

    const getTime = () => {
        setTimeNow(getCurrTime())

        setTimeout(() => {
            getTime()
        }, 300000)
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



    const saveOrder = () => {
        setClick(false)

        if (currOrder !== null) {
            const currBlock = document.querySelector('.curr-block')
            const width = currBlock.style.width

            if (Number(width.substr(0, width.length - 2)) < 10) {
                props.setCurrOrder(null)
                return;
            }
            const order = { ...currOrder, id: Math.random() }
            order.style = {
                ...currOrder.style,
                width,
                pointerEvents: 'auto'
            }

            setOrders(order)
            const block1C = document.getElementById('data-for-1c')
            block1C.dataset.location = currOrder.location
            block1C.dataset.time = JSON.stringify(currOrder.time)
            props.setCurrOrder(null)
        }
    }

    const deleteOrder = (item) => (e) => {
        e.preventDefault()
        const newOrders = orders.filter(order => order.id !== item.id)
        setOrders(newOrders)
    }

    const drawBlock = () => (e) => {
        if (click) {
            const currBlock = document.querySelector('.curr-block')
            currBlock.style.width = (currOrder.style.left - e.pageX) * -1 + "px"
        }
    }

    return (
        <div className="table" onMouseMove={drawBlock()} onMouseUp={() => saveOrder()}>
            {currOrder !== null &&
                <CurrOrder currOrder={currOrder} />}
            {orders.length > 0 && orders.map(item =>
                <Order deleteOrder={deleteOrder} item={item} />)}

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
            {rows.map((row, i) => (<Row key={Math.random()} row={row} i={i} />))}
        </div>
    )
}


const connComponent = connect(mapPropsToState, actionCreators)(Table);
export default connComponent