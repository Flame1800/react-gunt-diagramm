import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setRows](state, { payload: rows }) {
            return rows;
        }
    },
    []
)