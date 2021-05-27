import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TinyLineSingle from '../TinyLinechart/TinyLineSingle';


const Circle = styled.div`
    background: ${props => props.color || "#000"};
    height:12px;
    width:12px;
    border-radius:6px;
    float:left;
    margin-right:8px;
`
function Bulet(props) {
    return (
        <div style={{marginBottom: '1em',textAlign: 'center'}}>

            <div>
                <TinyLineSingle
                    color={props.color}
                    data={props.series}
                    height={30}
                    width={80}
                    dataKey="value"
                />
            </div>
            <div style={{marginBottom:'4px'}}>
                {/* <Circle color={props.color} /> */}
                <div className="bullet-head" style={{fontWeight:300,fontSize:'12px'}}>
                    {props.title} 
                </div>
            </div>
            {/* style={{marginLeft:'20px'}} */}
            <div >
                <Link to={""} style={{fontWeight:400,fontSize:'20px',color: props.color}}>
                    {props.mainNumber} 
                </Link>
            <div className="bullet-subtext" style={{fontSize:'12px',marginTop: '5px'}}>{props.count}</div>
            </div>
        </div>
    );
}

Bulet.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    newCase: PropTypes.string,
    linkTo: PropTypes.string,
    count: PropTypes.any
};


export default Bulet;