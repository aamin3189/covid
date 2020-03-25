import React from 'react';
import {Line,LineChart} from 'recharts';

function TinyLineChart(props) {
    return (
        <div>
            <LineChart width={props.width} height={props.height} data={props.data}>
                <Line type='monotone' dataKey='deaths' stroke='#C31111' dot={null} strokeWidth={2} />
                <Line type='monotone' dataKey='cases' stroke='#EB9B1B' dot={null} strokeWidth={2} />
                <Line type='monotone' dataKey='recovered' stroke='#3B830D' dot={null} strokeWidth={2} />
            </LineChart>
        </div>
    );
}

export default TinyLineChart;