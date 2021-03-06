import { combineReducers } from "redux";

import activePartsTable from './handlers/ActivePartsTable'
import currOrder from './handlers/currOrder'
import orders from './handlers/Orders'
import cars from './handlers/cars'
import timeParts from './handlers/timeParts'
import click from './handlers//click'
import timeNow from './handlers/timeNow'
import timeCoords from './handlers/timeCoords'
import rowCoords from './handlers/rowCoords'
import currDay from './handlers/currDay'
import rows from './handlers/rows'
import tableState from './handlers/tableState'

export default combineReducers({
    activePartsTable,
    tableState,
    currOrder,
    orders,
    timeParts,
    click,
    timeNow,
    timeCoords,
    rows,
    rowCoords,
    currDay,
    cars
})