import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setCar](state, { payload: car }) {
            return [...state, car ]
        },
        [actions.clearOrders]() {
            return []
        }
    },
    []
)