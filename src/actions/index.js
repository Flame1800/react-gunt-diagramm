
import { createAction } from "redux-actions";


// Head
export const nextDay = createAction('SET_NEXT_DAY')
export const prevDay = createAction('SET_PREV_DAY')

// Table
export const setRows = createAction('SET_ROWS')
export const setCoordsRow = createAction('SET_COORDS_ROW')
export const setActiveRow = createAction('SET_ACTIVE_ROW')
export const setActiveCell = createAction('SET_ACTIVE_CELL')
export const setTimeParts = createAction('SET_TIME_PARTS')
export const setTimeNow = createAction('SET_TIME_NOW')
export const setTimeCoords = createAction('SET_TIME_COORDS')
export const setTableState = createAction('SET_TABLE_STATE')

// UserState 
export const setClick = createAction('SET_CLICK')

// Order
export const deleteOrder = createAction('DELETE_ORDER')
export const setCurrOrder = createAction('SET_CURR_ORDER')
export const setOrders = createAction('SET_ORDERS')
export const clearOrders = createAction('CLEAR_ORDERS')

// Car
export const setCar = createAction('SET_CAR')
