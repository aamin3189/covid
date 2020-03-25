import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,Label
} from 'recharts';



export default class NDonut extends PureComponent {

  render() {
    return (
      <PieChart width={this.props.width} height={this.props.height} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.data}
          {...this.props}
        >
          {
            this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
          }
          <Label width={30} position="center"
            content={
                <CustomLabel 
                value1={numberWithCommas(this.props.total)} 
                value2={"Total Worldwide"}
                />}>
          </Label>
        </Pie>
      </PieChart>
    );
  }
}


function CustomLabel({viewBox, value1, value2}){
    const {cx, cy} = viewBox;
    return (
     <text x={cx} y={cy} fill="#000" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
        <tspan alignmentBaseline="middle" fontSize="26">{value1}</tspan>
        {/* <tspan fontSize="14">{value2}</tspan> */}
     </text>
    )
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}