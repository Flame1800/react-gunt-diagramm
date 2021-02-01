import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../../actions/index.js"
import timeToString from '../../../functions/timeToString'
import InterCell from './InterCell'
import CoordsCell from './CoordsCell'

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


function Cell(props) {
    const { time, activeCell, activeRow, setActiveCell, row, i, timeNow } = props
    const cellTime = timeToString(time.hour, time.minute)

    const minuteParts = []
    let minute = time.minute - 5

    for (let i = 0; i < 6; i++) {
        minute = minute + 5
        minuteParts.push(minute)
    }


    if (props.mode === 'coords') {
        return (
            <div key={Math.random()} className="cell empty-cell">
                {minuteParts.map(part => <CoordsCell minPart={part} time={time} />)}
            </div>
        )
    }
    if (((activeCell === cellTime && activeRow === row.name) && (timeNow.hour <= time.hour))
        || (timeNow.hour === time.hour && i === 0)) {
            console.log('inter-cell')
        return (
            <div key={Math.random()} className="cell empty-cell">
                {minuteParts.map(part => <InterCell i={i} minPart={part} time={time} row={row} />)}
            </div>
        )
    } else {
        return (
            <div
                key={Math.random()}
                className="cell empty-cell"
                onMouseMove={() => setActiveCell(cellTime)}
                >
            </div>
        )
    }
}



const connComponent = connect(mapPropsToState, actionCreators)(Cell);
export default connComponent