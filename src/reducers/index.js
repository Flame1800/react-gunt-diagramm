import { combineReducers } from "redux";

import activePartsTable from './handlers/ActivePartsTable'
import currOrder from './handlers/currOrder'
import orders from './handlers/Orders'
import timeParts from './handlers/timeParts'
import click from './handlers//click'
import timeNow from './handlers/timeNow'

export default combineReducers({
    activePartsTable,
    currOrder,
    orders,
    timeParts,
    click,
    timeNow
})