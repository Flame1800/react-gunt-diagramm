import { combineReducers } from "redux";

import activePartsTable from './handlers/ActivePartsTable'
import currOrder from './handlers/currOrder'
import orders from './handlers/Orders'
import timeParts from './handlers/timeParts'
import click from './handlers//click'
import timeNow from './handlers/timeNow'
import timeCoords from './handlers/timeCoords'
import rowCoords from './handlers/rowCoords'
import rows from './handlers/rows'

export default combineReducers({
    activePartsTable,
    currOrder,
    orders,
    timeParts,
    click,
    timeNow,
    timeCoords,
    rows,
    rowCoords
})