import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const Tle = styled.div`
    padding: 16px;
    border-radius: 7px;
    i:nth-child(2){
        float:right
    }
    a{
        color: #666;
    }
`


function Tile(props) {
    return (
      <Tle className="tile" onClick={()=>props.history.push(props.to)}>
        <Link to={props.to}>
          <i className={props.className}></i> {props.title}
          <i className="fa fa-chevron-right"></i>
        </Link>
      </Tle>
    );
}

export function EventTile(props) {
  return (
    <Tle className="tile" onClick={props.onClick}>
      <Link to={""}>
        <i className={props.className}></i> {props.title}
        <i className="fa fa-chevron-right"></i>
      </Link>
    </Tle>
  );
}

export default Tile;