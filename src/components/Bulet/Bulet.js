import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


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
        <div style={{marginBottom: '1em'}}>
            <div style={{marginBottom:'4px'}}>
                <Circle color={props.color} />
                <div style={{fontWeight:400,fontSize:'12px'}}>
                    {props.title} 
                </div>
            </div>
            <div style={{marginLeft:'20px'}}>
                <Link to={props.linkTo} style={{fontWeight:400,fontSize:'20px',color: props.color}}>
                    {props.mainNumber} 
                </Link>
                <div style={{fontSize:'10px',color:"#7c7c7c"}}>10 New</div>
            </div>
        </div>
    );
}

Bulet.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    newCase: PropTypes.number,
    linkTo: PropTypes.string,
    count: PropTypes.string
};


export default Bulet;