import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions({
    [actions.setCar](state, { payload: car }) {
        return [...state, car]
    },
    [actions.changeStateCar](state, { payload: { id, mode } }) {
        state.forEach(car => {
            car.state = car.id === id ? mode : car.state
        })
        return [...state]
    },
}, [])