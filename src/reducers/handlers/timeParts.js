import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setTimeParts](state, { payload: {parts} }) {
            return parts
        },
    },
    []
)