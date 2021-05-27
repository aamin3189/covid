import React from 'react';
import {Line,LineChart} from 'recharts';
import PropTypes from 'prop-types';


function TinyLineSingle({width, height,data,color,dataKey}) {
    return (
        <div>
            <LineChart width={width} height={height} data={data}>
                <Line type='monotone' dataKey={dataKey} stroke={color} dot={null} strokeWidth={2} />
            </LineChart>
        </div>
    );
}

TinyLineSingle.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    color: PropTypes.string,
    dataKey: PropTypes.string
}

export default TinyLineSingle;