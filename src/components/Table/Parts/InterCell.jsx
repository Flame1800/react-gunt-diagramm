import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../../actions/index.js"
import getDuration from '../../../functions/getDuration'

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts,
        currOrder: state.currOrder,
        activeCell: state.activePartsTable.cell,
        activeRow: state.activePartsTable.row,
        click: state.click,
        timeNow: state.timeNow,
        currDay: state.currDay
    }
}

const actionCreators = {
    setCurrOrder: actions.setCurrOrder,
    setTimeParts: actions.setTimeParts,
    setClick: actions.setClick,
    setActiveCell: actions.setActiveCell,
    setOrders: actions.setOrders,

};


function InterCell(props) {
    const { minPart, currDay, i, currOrder, setOrders, setCurrOrder, click, setClick, time, row, timeNow } = props

    const saveOrder = () => (e) => {
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

            // setOrders(order)
            // const block1C = document.getElementById('data-for-1c')
            // block1C.dataset.location = currOrder.location
            // block1C.dataset.time = JSON.stringify(currOrder.time)
            // props.setCurrOrder(null)
        }
    }

    const createBlock = ({ time, nameRow }) => (e) => {
        if ((time.hour >= timeNow.hour
            && (time.hour === timeNow.hour && time.minute >= timeNow.minute))
            || time.hour >= timeNow.hour + 1) {

            setClick(true);
            const parent = e.target;
            const width = e.target.offsetWidth;
            const height = e.target.offsetHeight;

            const style = {
                top: parent.offsetTop,
                left: parent.offsetLeft,
                width: width,
                height: height,
                pointerEvents: 'none',
            }

           const orderDate = new Date(currDay)
            
            setCurrOrder({
                time: {
                    start: time,
                    end: time
                },
                location: nameRow,
                date: orderDate,
                style,
            })
        }
    }

    const drawBlock = () => (e) => {
        if (click) {
            setEndTime({ currTime: { hour: time.hour, minute: minPart } })
            const currBlock = document.querySelector('.curr-block')
            currBlock.style.width = (currOrder.style.left - e.pageX) * -1 + "px"
        }
    }

    const setEndTime = ({ currTime }) => {
        if (currOrder !== null) {
            setCurrOrder({
                ...currOrder,
                time: { ...currOrder.time, end: currTime },
                duration: getDuration(currOrder.time.start, currTime)
            })
        }
    }

    const cellRef = React.useRef(null)

    if (props.mode === 'coords') {
        const timeCoords = { hour: time.hour, minute: minPart }
        props.setCoords({ coords: cellRef })

        return (
            <>
                <div
                    time={timeCoords}
                    ref={cellRef}
                    className="minute-part">
                </div>
            </>
        )
    }

    return (
        <>
            <div
                onMouseDown={createBlock({ time: { hour: time.hour, minute: minPart }, nameRow: row.name })}
                onMouseUp={saveOrder()}
                onMouseMove={drawBlock()}
                className="minute-part">

                {timeNow.hour === time.hour
                    && timeNow.minute >= minPart
                    && timeNow.minute <= minPart + 4
                    && i === 0
                    ? (<div className="red-line"></div>) : ''
                }
            </div>
        </>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(InterCell);
export default connComponent