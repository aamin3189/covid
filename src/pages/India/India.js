import React, { Component } from "react";
import axios from "axios";
import conf from "../../config/config";
import { Head, Inc, Circle, Grid, Stat } from "../../components/styled/styled";
import { Link } from "react-router-dom";
import { Icon } from "antd-mobile";
import { numberWithCommas } from "../Countries/Country";
import Skeleton from "react-loading-skeleton";
import { getHistoricalDataContry, getIndiaStats } from "../../utils/dataOpsWM";
import moment from "moment";
import TinyLineChart from "../../components/TinyLinechart/TinyLineChart";
import BarStats from "../../components/charts/BarStats";
import {Line,LineChart} from 'recharts';
import StateWise from "../../components/StateWise/StateWise";

class India extends Component {
  state = {
    data: null,
    historicalData: null
  };
  async componentDidMount() {
    getIndiaStats().then(resp=>{
        this.setState({
            data: resp
        })
    })
  }

  convertData(arr){
    let newArr = [];

    for(let i = 0; i< arr.length; i++){
        newArr.push({
            date: arr[i].date,
            "Daily Confirmed":parseInt(arr[i].dailyconfirmed),
            "Daily Death": parseInt(arr[i].dailydeceased),
            "Daily Recovered": parseInt(arr[i].dailyrecovered)
        })
    }
    return newArr;
  }


  render() {

    const data = this.state.data;

    return (
      <div className="countries">
        <div className="controls">
          <div className="search-control">
            <div className="top-controls">
              <Link to="/" className="back">
                <Icon size="md" type="left" />
                Back
              </Link>
            </div>
          </div>
        </div>

        {
          <Inc style={{ marginTop: 80 }}>
            {this.state.data && (
              <Head>
                <div>
                  <img
                    style={{ height: 30, marginRight: 5 }}
                    src={require('../../components/CountryTile/indianFlag.png')}
                    alt="India"
                  />
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    marginTop: 10,
                    color: "#7c7c7c"
                  }}
                >
                    INDIA
                </div>
                <div style={{ fontSize: 20, fontWeight: 400, marginTop: 10 }}>
                  {numberWithCommas(data.statewise[0].confirmed)}
                </div>
              </Head>
            )}

            {this.state.data && (
              <Grid>
                <Stat color="#EB9B25">
                  <div className="num">
                    {numberWithCommas(data.statewise[0].active)}{" "}
                    <small>
                    &nbsp;&#8593;{numberWithCommas(data.key_values[0].confirmeddelta)}
                  </small>
                  </div>
                  <div className="case">Active Cases</div>
                </Stat>
                <Stat color="#3B8313">
                  <div className="num">
                    {numberWithCommas(data.statewise[0].recovered)}{" "}
                    {data.key_values[0].recovereddelta > 0 && 
                      <small>
                        &nbsp; &#8593;{numberWithCommas(data.key_values[0].recovereddelta)}
                      </small>
                    }
                  </div>
                  <div className="case">Recovered</div>
                </Stat>
                <Stat color="#C31112">
                  <div className="num">
                    {numberWithCommas(data.statewise[0].deaths)}{" "}
                    { data.key_values[0].deceaseddelta > 0 &&
                      <small>
                         &nbsp; &#8593;{numberWithCommas(data.key_values[0].deceaseddelta)}
                      </small>
                    }
                  </div>
                  <div className="case">Death</div>
                </Stat>

                {/* <Stat color="#EB5569">
                  <div className="num">
                    {numberWithCommas(this.state.data.critical)}
                    <small>
                      {" "}
                      &nbsp;
                      {(
                        (this.state.data.critical / this.state.data.cases) *
                        100
                      ).toFixed(0)}
                      %
                    </small>
                  </div>
                  <div className="case">Critical</div>
                </Stat>
                <Stat color="#3B8313">
                  <div className="num">
                    {(
                      (this.state.data.deaths / this.state.data.cases) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="case">Mortality Rate</div>
                </Stat>
                <Stat color="#C31112">
                  <div className="num">
                    {this.state.data.deathsPerOneMillion}
                  </div>
                  <div className="case">Death Per 1M</div>
                </Stat> */}
              </Grid>
            )}


            

            {this.state.data &&
                <div style={{textAlign:'left'}}>
                    <span className="header" style={{color:'#7c7c7c'}}> 
                    Statewise Data
                    </span>
                    <StateWise agregatedData={this.state.data.statewise} />
                </div>
            }

          <div className="timeline">
              {this.state.data ? (
                <>
                  <span className="header">
                    Timeline :
                    {moment(this.state.data.cases_time_series[0].date).format(
                      "MMM Do"
                    )}
                    -
                    {moment(
                      this.state.data.cases_time_series[
                        this.state.data.cases_time_series.length - 1
                      ].date
                    ).format("MMM Do")}
                  </span>


                <LineChart height={100} width={window.screen.width - 50}  data={this.state.data.cases_time_series}>
                    <Line type='monotone' dataKey='totaldeceased' stroke='#C31111' dot={null} strokeWidth={2} />
                    <Line type='monotone' dataKey='totalconfirmed' stroke='#EB9B1B' dot={null} strokeWidth={2} />
                    <Line type='monotone' dataKey='totalrecovered' stroke='#3B830D' dot={null} strokeWidth={2} />
                </LineChart>
                </>
              ) : (
                <Skeleton height={100} width={window.screen.width - 40} />
              )}
            </div>

            <div className="timeline">
              {this.state.data && (
                <BarStats
                  height={200}
                  width={window.screen.width - 50}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  dataKey="date"
                  refStroke="#7c7c7c"
                  brushStroke="#7c7c7c"
                  keys={[
                    { name: "Daily Confirmed", color: "#EB9B1B" },
                    { name: "Daily Death", color: "#C31111" },
                    { name: "Daily Recovered", color: "#3B830D" }
                  ]}
                  data={this.convertData(this.state.data.cases_time_series)}
                />
              )}
            </div>

          </Inc>
        }
      </div>    
    );
  }
}

export default India;
