import React, { Component } from "react";
import {BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import PropTypes from 'prop-types';
import styled from "styled-components";

const BarContainer = styled.div`
    font-size: 10px;
    font-family: Poppins;
`

class BarStats extends Component {
  render() {
    return (
      <BarContainer>
        <BarChart
          width={this.props.width}
          height={this.props.height}
          data={this.props.data}
          margin={this.props.margin}
        >
          <XAxis dataKey={this.props.dataKey} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke={this.props.refStroke} />
          <Brush travellerWidth={30} dataKey="name" height={16} stroke={this.props.brushStroke} />
          {
              this.props.keys.map((key,index)=>(
                <Bar key={index} dataKey={key.name} fill={key.color} />
              ))
          }
        </BarChart>
      </BarContainer>
    );
  }
}

BarStats.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
        left: PropTypes.any,
        right: PropTypes.any,
        top:PropTypes.any,
        bottom:PropTypes.any
    }),
    dataKey: PropTypes.string,
    refStroke: PropTypes.string,
    brushStroke: PropTypes.string,
    keys: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ),
    data: PropTypes.any
};

export default BarStats;