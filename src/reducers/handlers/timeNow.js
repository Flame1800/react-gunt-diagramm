import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setTimeNow](state, { payload: time }) {
            return time;
        },
    },
    { hour: 0, minute: 0 }
)