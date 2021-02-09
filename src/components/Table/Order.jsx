import timeToString from '../../functions/timeToString'
import * as actions from "../../actions/index.js";
import { connect } from "react-redux";

const mapPropsToState = (state) => {
    return {
        timeNow: state.timeNow
    }
}

const actionCreators = {
    deleteOrder: actions.deleteOrder,
    aceptOrder: actions.setCar
};

function Order(props) {
    const { item, deleteOrder, aceptOrder, timeNow } = props

    const time = {
        start: timeToString(item.time.start.hour, item.time.start.minute),
        end: timeToString(item.time.end.hour, item.time.end.minute)
    }

    const deleteOrderHandle = (item) => (e) => {
        e.preventDefault()
        deleteOrder(item)
    }

    const aceptOrderHandle = (item) => (e) => {
        e.preventDefault()
        deleteOrder(item)
        aceptOrder(item)
    }

    let classesOrder = "curr-block active-block"

    if (item.time.end.hour < timeNow.hour || (item.time.end.hour === timeNow.hour && item.time.end.minute < timeNow.minute) ) {
        classesOrder += " pass-state"
    }
    if (item.time.start.hour > timeNow.hour || (item.time.start.hour === timeNow.hour && item.time.start.minute > timeNow.minute) ) {
        
        classesOrder += "passive-state"
    }
    else {
        classesOrder += " working-state"
    }


    return (
        <div
            key={item.id}
            style={item.style}
            className={classesOrder}>
            <div className="curr-time">
                <div className="value">
                    {`${time.start} `} - {` ${time.end} `}
                </div>
                {` ${item.duration}`}

                <div className="btn-delete" onClick={deleteOrderHandle(item)}></div>
                <div className="btn-accept" onClick={aceptOrderHandle(item)}></div>
            </div>
        </div>
    )
}


const connComponent = connect(mapPropsToState, actionCreators)(Order);
export default connComponent