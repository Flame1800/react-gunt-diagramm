import timeToString from '../../functions/timeToString'
import * as actions from "../../actions/index.js"
import { connect } from "react-redux"

const mapPropsToState = (state) => {
    return {
        currOrder: state.currOrder,
        cars: state.cars
    }
}

const actionCreators = {
    setOrders: actions.setOrders,
    setCurrOrder: actions.setCurrOrder,
    setTableState: actions.setTableState,
    setCurrOrder: actions.setCurrOrder,
    changeStateCar: actions.changeStateCar,
};

function CurrOrder(props) {

    const {
        currOrder,
        setOrders,
        setCurrOrder,
        setTableState,
        cars,
        changeStateCar
    } = props

    const currentCar = cars.filter(car => car.state == 'process')[0]

    const resetOrder = () => (e) => {
        e.preventDefault()
        setCurrOrder(null)
        setTableState('passive')
        changeStateCar({ id: currentCar.id, mode: 'queue' })
        const block1C = document.getElementById('data-for-1c')
        block1C.dataset.changeStateCar = JSON.stringify(currentCar.id)
    }

    const saveOrder = () => (e) => {
        if (currOrder !== null) {
            const currBlock = document.querySelector('.curr-block')
            const width = currBlock.style.width

            const order = { 
                ...currOrder, 
                id: Math.random(),
                car_id: currentCar.id,
                carModel: currentCar.model, 
            }
            order.style = {
                ...currOrder.style,
                width,
                pointerEvents: 'auto'
            }

            setOrders(order)
            const block1C = document.getElementById('data-for-1c')
            block1C.dataset.order = JSON.stringify(currentCar.id)
            setCurrOrder(null)
            setTableState('passive')
        }
    }

    return (
        <div
            style={currOrder.style}
            className="curr-block block">
            <div className="curr-time">
                {`${currentCar.model} `}
                {timeToString(currOrder.time.start.hour, currOrder.time.start.minute)}
                -
                {timeToString(currOrder.time.end.hour, currOrder.time.end.minute)}
                {currOrder.duration && ` ${currOrder.duration}`}

                <div className="btn-delete" onClick={resetOrder()}></div>
                <div className="btn-accept" onClick={saveOrder()}></div>
            </div>
        </div>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(CurrOrder);
export default connComponent