import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions({
    [actions.setOrders](state, { payload: order }) {
        return [...state, order]
    },
    [actions.deleteOrder](state, { payload: order }) {
        const newOrders = state.filter(item => item.id !== order.id)
        return newOrders
    },
    [actions.clearOrders]() {
        return []
    }
}, [])