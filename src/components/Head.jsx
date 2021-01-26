import React from 'react'

export default function Head(props) {
    return (
        <div className="head">
            <div className="switch-day">
                <div className="curr-value">Сегодня</div>
                <div className="prev switch-btn">Пред.</div>
                <div className="next switch-btn">След.</div>
            </div>
            <div className="date">14 янв. 2020</div>
        </div>
    )
}