import React from 'react';
import './legend.scss';

function Legend(props) {
    return (
        <div className="legend" style={{textAlign: props.textAlign}}>
            <div className="info">
                {props.info}
            </div>
            <div style={{color: props.color}} className="number">
                {props.number}
                { props.showBadge &&
                    <i style={{color:'#7F70D3',marginLeft:5,fontSize:'10px'}} className="fa fa-1x fa-circle blink"></i>
                }
            </div>
            <div className="extra">{props.extra}</div>
        </div>
    );
}

export default Legend;