import React from 'react';
import PropTypes from 'prop-types';
import './bar.scss';

const CustomBar = ({data,dataKey}) => {
    return (
        <div className="bar">
            {
                data.map((bar,key)=>(
                    <div 
                        key={key} 
                        style={{
                            width: `${bar[dataKey]}%`,
                            background: bar.color, 
                            float: 'left', 
                            height: '10px' 
                        }} />
                ))
            }
        </div>
    );
};

CustomBar.propTypes = {
    data: PropTypes.array,
    dataKey: PropTypes.string
}

export default CustomBar;