import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setTableState](state, { payload: mode }) {
            return mode;
        },
    },
    "passive"
)