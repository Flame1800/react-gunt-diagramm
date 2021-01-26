import timeToString from '../../functions/timeToString'

export default function CurrOrder({ currOrder }) {
    return (
        <div
            style={currOrder.style}
            className="curr-block">
            <div className="curr-time">
                {timeToString(currOrder.time.start.hour, currOrder.time.start.minute)}
                -
                {timeToString(currOrder.time.end.hour, currOrder.time.end.minute)}
                {currOrder.duration && ` ${currOrder.duration}`}
            </div>
        </div>
    )
}