import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../../actions/index.js"

const actionCreators = {
    setCoords: actions.setTimeCoords
};

const mapStateToProps = (state) => ({ timeCoords: state.timeCoords })


function CoordsCell(props) {
    const { minPart, time, setCoords, timeCoords } = props
    const cellRef = React.useRef()

    const currTime = { hour: time.hour, minute: minPart }

    React.useEffect(() => {
        if (timeCoords.length <= 0) {
            const parentCoords = cellRef.current.parentNode.offsetLeft
            const nodeCoords = cellRef.current.offsetLeft
    
            const coords = parentCoords + nodeCoords

            setCoords({ time: currTime, coords })
        }
    }, [])


    return (
        <>
            <div
                ref={cellRef}
                key={Math.random()}
                className="minute-part">
            </div>
        </>
    )
}

const connComponent = connect(mapStateToProps, actionCreators)(CoordsCell);
export default connComponent