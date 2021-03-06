import React from 'react';
import styled from 'styled-components';

export const Inc = styled.div`
    text-align:center;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 22px;
    a{
        color: #EB5569;
    }
`

export const Head = styled.div`
  /* float:left */
`;

export const Circle = styled.div`
  background: #ddd;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  margin-right: 8px;
  margin-left: 10px;
  margin-top: 3px;
  float: left;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
`;

export const Stat = styled.div`
  .num {
    color: ${props => props.color || "#000"};
    font-size: 14px;
    font-weight: 500;
    margin-bottom:10px;
    small{
          /* color: #FFF; */
          /* background-color: ${props => props.color || "#000"}; */
          border-radius:10px;
          text-align:center;
          padding-right:5px;
          font-size:12px;
      }
  }
  .case {
    color: #7c7c7c;
    font-size: 10px;
  }
`;

export const MapButton = styled.span`
  float: right;
  /* color: #EB5569; */
  padding:4px;
  border-radius:10px;
`