import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setTimeCoords](state, { payload: coords }) {
            return [...state, coords]
        },
    },
    []
)