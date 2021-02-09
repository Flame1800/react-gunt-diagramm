import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.nextDay](state, { payload: date }) {
            const newDate = date.setDate(date.getDate() + 1);
            return new Date(newDate)
        },
        [actions.prevDay](state, { payload: date }) {
            const newDate = date.setDate(date.getDate() - 1);
            return new Date(newDate)
        },
    },
    new Date()
)