
import timeToString from '../../functions/timeToString'
import * as actions from "../../actions/index.js";
import { connect } from "react-redux";



const actionCreators = {
    deleteOrder: actions.deleteOrder
};

function Order(props) {
    const { item, deleteOrder } = props

    const time = {
        start: timeToString(item.time.start.hour, item.time.start.minute),
        end: timeToString(item.time.end.hour, item.time.end.minute)
    }

    const deleteOrderHandle = (item) => (e) => {
        e.preventDefault()
        deleteOrder(item)
    }

    return (
        <div
            key={item.id}
            style={item.style}
            className="curr-block active-block">
            <div className="curr-time">
                {time.start}
                -
                {time.end}
                {` ${item.duration}`}

                <div className="btn-delete" onClick={deleteOrderHandle(item)}></div>
            </div>
        </div>
    )
}


const connComponent = connect(null, actionCreators)(Order);
export default connComponent