import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setCurrOrder](state, { payload: order }) {
            return order;
        },
    },
    null
)