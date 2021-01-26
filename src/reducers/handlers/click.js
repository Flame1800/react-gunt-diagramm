import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setClick](state, { payload: click }) {
            return click;
        },
    },
    false
)