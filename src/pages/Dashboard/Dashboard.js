import React, { Component } from "react";
import Axios from "axios";
import conf from "../../config/config";
import NDonut from "../../components/charts/Donut";
import Legend from "../../components/legend/Legend";
import _ from 'underscore';
import "./dashboard.scss";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import '../../components/legend/legend.scss';
import {PullToRefresh} from 'antd-mobile';

const sketch = {
  height: 10,
  width: 80,
  line: 3
};

class Dashboard extends Component {
  state = {
    stats: null,
    totalStats: null,
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ 
      stats: null,
      totalStats: null,
      loading: true });
    this.getTotalStats();
  }

  //Make api calls to get all the primary stats
  getTotalStats = () => {
    Axios.get(`${conf.api}/all`).then(resp => {
      const apiData = resp.data;
      //format data
      let stats = [
        {
          name: "Deaths",
          value: apiData.deaths,
          color: "#C31111"
        },
        {
          name: "Recovered",
          value: apiData.recovered,
          color: "#3B830D"
        },
        {
          name: "Active Case",
          value: apiData.cases - apiData.deaths - apiData.recovered,
          color: "#EB9B1B"
        }
      ];
      this.setState({
        stats: stats,
        total: apiData.cases
      });
      this.getDetailedStats();
    });
  };

  getDetailedStats = () => {
    let totalStats = {
      cases: 0,
      newCases: 0,
      deaths: 0,
      newDeaths: 0,
      recovered: 0,
      active: 0,
      critical: 0
    };
    Axios.get(`${conf.api}/countries`).then(resp => {
      let countries = resp.data;
      for (let i = 0; i < countries.length; i++) {
        totalStats.cases += countries[i].cases;
        totalStats.newCases += countries[i].todayCases;
        totalStats.deaths += countries[i].deaths;
        totalStats.newDeaths += countries[i].todayDeaths;
        totalStats.recovered += countries[i].recovered;
        totalStats.active += countries[i].active;
        totalStats.critical += countries[i].critical;
      }




      this.setState({
        totalStats,
        countries,
        loading: false,
        india:  _.find(countries,(d)=>{
          return d.country == 'India'
        })
      });

      localStorage.setItem("countries", JSON.stringify(countries));
    });
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const { totalStats } = this.state;
    return (
      <PullToRefresh onRefresh={()=>this.getData()} indicator={{ }}>
        <div style={{position: 'absolute',top:'19px',left:'21px',zIndex:9999}}>
              <Link to="/" style={{color: "#EB5569"}}>
                  <i className="fa fa-chevron-left"></i> Back
              </Link>
        </div>
      <div className="dashboard">
        <div className="stats">
          {this.state.stats ? (
            <NDonut
              cx={window.screen.width / 2}
              cy={window.screen.height / 4}
              innerRadius={90}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              data={this.state.stats}
              total={this.state.total}
              cornerRadius={40}
              width={window.screen.width} 
              height={window.screen.height/2}
            />
          ) : (
            <div style={{ marginTop: 40 }}>
              <Skeleton circle={true} height={230} width={230} />
            </div>
          )}
        </div>

        <div className="legends">
          {this.state.totalStats ? (
            <Legend
              info="Active Case"
              number={this.numberWithCommas(totalStats.active)}
              extra={`${(
                (this.state.totalStats.active / totalStats.cases) *
                100
              ).toFixed(0)}% stil infected`}
              color="#EB9B1B"
              textAlign="left"
            />
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}
          {this.state.totalStats ? (
            <Legend
              info="Recovered"
              number={this.numberWithCommas(totalStats.recovered)}
              extra={`${(
                (this.state.totalStats.recovered / totalStats.cases) *
                100
              ).toFixed(0)}% recovered`}
              color="#3B830D"
              textAlign="center"
            />
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}

          {this.state.totalStats ? (
            <Legend
              info="Died"
              number={this.numberWithCommas(totalStats.deaths)}
              extra={`+${this.numberWithCommas(totalStats.newDeaths)} new`}
              color="#C31111"
              textAlign="right"
            />
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}
          {this.state.totalStats ? (
            <Link to="countries">
              <Legend
                info="Countries"
                number={this.state.countries.length}
                extra={`${((this.state.countries.length / 198) * 100).toFixed(
                  0
                )}% worldwide`}
                color="#7F70D3"
                textAlign="left"
                showBadge={true}
              />
            </Link>
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}

          {this.state.totalStats ? (
            <Legend
              info="Mortality Rate"
              number={`${(
                (this.state.totalStats.deaths / totalStats.cases) *
                100
              ).toFixed(0)}%`}
              extra={`Pandemic`}
              color="#DD7652"
              textAlign="center"
            />
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}


          {this.state.totalStats ? (
            <Link to="india">
            <Legend
              info="India"
              number={
                this.state.india.cases
              }
              extra={`${this.state.india.deaths} died`}
              icon="india"
              color="#367DD9"
              textAlign="right"
            />
            </Link>
          ) : (
            <div className="legend">
              <Skeleton width={sketch.width} height={sketch.height} count={sketch.line} />
            </div>
          )}
        </div>

        <div>
          <img src={require("./StayHome.jpg")} alt="stay-home" />
        </div>
      </div>
      </PullToRefresh>
    );
  }
}

export default Dashboard;
