import React from 'react'
import Cell from './Cell'
import * as actions from "../../../actions/index.js";
import { connect } from "react-redux";


const actionCreators = {
    setActiveRow: actions.setActiveRow,
};

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts
    }
}

function Row(props) {
    const { row, setActiveRow, timeParts, i } = props
    return (
        <div key={row.id}
            onMouseMove={() => setActiveRow(row.name)}
            className="row">

            <div className="cell named-cell">{row.name}</div>
            {timeParts.map(time => <Cell
             key={Math.random()} time={time} row={row} i={i} />)}
        </div>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(Row);
export default connComponent