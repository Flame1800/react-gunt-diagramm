import * as actions from "../../actions/index.js";
import { handleActions } from "redux-actions";

export default handleActions(
    {
        [actions.setActiveRow](state, { payload: name }) {
            return {
                row: name,
                cell: state.cell
            };
        },
        [actions.setActiveCell](state, { payload: name }) {
            return {
                row: state.row,
                cell: name
            };
        }
    },
    {
        row: null,
        cell: null
    }
)