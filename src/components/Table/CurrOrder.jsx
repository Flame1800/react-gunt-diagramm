import timeToString from '../../functions/timeToString'

export default function CurrOrder({ currOrder }) {

    const deleteOrderHandle = () => (e) => {
        e.preventDefault()
        // deleteOrder(item)
    }

    const aceptOrderHandle = () => (e) => {
        e.preventDefault()
        // deleteOrder(item)
        // aceptOrder(item)
    }
    return (
        <div
            style={currOrder.style}
            className="curr-block">
            <div className="curr-time">
                {timeToString(currOrder.time.start.hour, currOrder.time.start.minute)}
                -
                {timeToString(currOrder.time.end.hour, currOrder.time.end.minute)}
                {currOrder.duration && ` ${currOrder.duration}`}

                <div className="btn-delete" onClick={deleteOrderHandle()}></div>
                <div className="btn-accept" onClick={aceptOrderHandle()}></div>
            </div>
        </div>
    )
}