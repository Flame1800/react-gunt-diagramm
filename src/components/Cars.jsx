import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import '../styles/cars.css'
import serverSideCars from '../mockData/cars'

const mapPropsToState = (state) => {
    return {
        currDay: state.currDay,
        cars: state.cars
    }
}

const actionCreators = {
    setCar: actions.setCar,
    setTableState: actions.setTableState
};

function Cars(props) {
    const { cars, setCar, setTableState } = props

    const loadCars = (cars = serverSideCars) => cars.forEach(car => setCar(car))

    // React.useEffect(() => loadCars(), [])

    const dataFrom1C = document.getElementById('data-for-react')
    dataFrom1C.addEventListener('click', () => {
        if (dataFrom1C.dataset.cars) {
            loadCars(JSON.parse(dataFrom1C.dataset.cars))
        }
    })

    const createOrder = (car) => (e) => {
        e.preventDefault()
        setTableState('active')
    }

    const renderCarsCard = (mode) => {

        const currCars = cars.filter(car => car.state === mode)

        return (
            <div className="cars">
                <div className="head-cars">
                    <div className="title">
                        {mode === 'ready' ? 'Готовые автомобили' : 'На очереди'}
                    </div>
                </div>
                <div className="items">
                    {currCars.map(car => {

                        return (
                            <div className="item"
                            onClick={createOrder(car)}
                            >
                                <div className="number">
                                    <div className="nums">{car.number.value}</div>
                                    <div className="region">
                                        <div className="value">{car.number.region}</div>
                                        <div className="country">
                                            <div className="value">rus</div>
                                            <div className="img"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="name">{car.model}</div>
                                <div className="description">{car.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className='cars-block'>
            {renderCarsCard('queue')}
            {renderCarsCard('ready')}
        </div>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(Cars);
export default connComponent