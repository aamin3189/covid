import React from 'react';
import './legend.scss';

function Legend(props) {
    return (
        <div className="legend" style={{textAlign: props.textAlign,minWidth:window.screen.width/3.5}}>
            <div className="info">
                {props.info}
            </div>
            <div style={{color: props.color}} className="number">
                {
                    props.icon == "india" &&
                    <img className="blink" style={{height:'10px',marginRight:4}} src={require('../../pages/Countries/flags/india.png')} alt="india" />

                }
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