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
        timeNow: state.timeNow
    }
}

const actionCreators = {
    setCurrOrder: actions.setCurrOrder,
    setTimeParts: actions.setTimeParts,
    setClick: actions.setClick,
    setActiveCell: actions.setActiveCell,
};


function InterCell(props) {
    const { minPart, i, currOrder, setCurrOrder, click, setClick, time, row, timeNow } = props

    const setEndTime = ({ currTime }) => (e) => {
        if (currOrder !== null && click) {
            setCurrOrder({
                ...currOrder,
                time: { ...currOrder.time, end: currTime },
                duration: getDuration(currOrder.time.start, currTime)
            })
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

            setCurrOrder({
                time: {
                    start: time,
                    end: time
                },
                location: nameRow,
                style,
            })
        }
    }

    return (
        <>
            <div
                key={Math.random()}
                onMouseDown={createBlock({ time: { hour: time.hour, minute: minPart }, nameRow: row.name })}
                onMouseMove={setEndTime({ currTime: { hour: time.hour, minute: minPart } })}
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