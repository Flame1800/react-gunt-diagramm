import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setCoordsRow](state, { payload: {id, coords} }) {            
            return [...state, {coords, id}]
        }
    },
    []
)