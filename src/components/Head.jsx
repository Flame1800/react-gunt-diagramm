import React from 'react'
import { connect } from "react-redux";
import * as actions from "../actions/index.js";


const mapPropsToState = (state) => {
    return {
        currDay: state.currDay
    }
}

const actionCreators = {
    nextDay: actions.nextDay,
    prevDay: actions.prevDay,
};

function Head(props) {
    const { prevDay, nextDay, currDay } = props
    const date = currDay

    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

    const todayFormated = `${day}.${month.toLocaleString('ru', { month: 'long' })}.${date.getFullYear()}`
    return (
        <div className="head">
            <div className="switch-day">
                {new Date().getDate() !== date.getDate() ?
                    <div onClick={() => prevDay(date)} className="prev switch-btn"></div>
                    : null}
                <div className="curr-value">{todayFormated}</div>
                <div onClick={() => nextDay(date)} className="next switch-btn"></div>
            </div>
        </div>
    )
}

const connComponent = connect(mapPropsToState, actionCreators)(Head);
export default connComponent