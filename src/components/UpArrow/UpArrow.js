import React from 'react';

function UpArrow(props) {
    return (
            <div style={{color:props.color,display:'inline-block'}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width={props.size} height={props.size}
                viewBox="0 0 24 24" fill={props.color} 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            </div>
    );
}

export default UpArrow;