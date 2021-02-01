import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../../actions/index.js"

const actionCreators = {
    setCoords: actions.setTimeCoords
};


function CoordsCell(props) {
    const { minPart, time, setCoords } = props
    const cellRef = React.useRef(null)

    const timeCoords = { hour: time.hour, minute: minPart }

    // setCoords({ coords: cellRef })

    const testClickCoords = () => (e) => {
        // const parentCoords = e.target.parentNode.offsetLeft
        // const nodeCoords = e.target.offsetLeft

        // const coords = parentCoords + nodeCoords

    }

    return (
        <>
            <div
                time={timeCoords}
                ref={cellRef}
                key={Math.random()}
                onClick={testClickCoords()}
                className="minute-part">
            </div>
        </>
    )
}

const connComponent = connect(null, actionCreators)(CoordsCell);
export default connComponent