import React from 'react'
import Cell from './Cell'
import * as actions from "../../../actions/index.js";
import { connect } from "react-redux";


const actionCreators = {
    setActiveRow: actions.setActiveRow,
    setCoordsRow: actions.setCoordsRow
};

const mapPropsToState = (state) => {
    return {
        timeParts: state.timeParts,
        rows: state.rows,
        rowCoords: state.rowCoords
    }
}

function Row(props) {
    const { row, setActiveRow, timeParts, setCoordsRow, i } = props

    const rowRef = React.useRef(null)
    // const setCoords = () => (e) => {
    //     setCoordsRow({
    //         id: row.id,
    //         coords: rowRef.current.offsetTop
    //     })
    // }
    // React.useEffect(setCoords(), [])

    return (
        <div key={row.id}
            ref={rowRef}
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