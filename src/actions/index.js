
import { createAction } from "redux-actions";

// export const fetchTasksRequest = createAction("TASKS_FETCH_REQUEST");

export const setRows = createAction('SET_ROWS')
export const setCoordsRow = createAction('SET_COORDS_ROW')
export const setActiveRow = createAction('SET_ACTIVE_ROW')
export const setActiveCell = createAction('SET_ACTIVE_CELL')
export const setTimeParts = createAction('SET_TIME_PARTS')
export const setClick = createAction('SET_CLICK')
export const setTimeNow = createAction('SET_TIME_NOW')

export const deleteOrder = createAction('DELETE_ORDER')
export const setCurrOrder = createAction('SET_CURR_ORDER')
export const setOrders = createAction('SET_ORDERS')

export const setTimeCoords = createAction('SET_TIME_COORDS')