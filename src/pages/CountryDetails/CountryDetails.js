import React, { Component } from "react";
import "./country-details.scss";
import axios from "axios";
import conf from "../../config/config";
import {Head,Inc,Circle,Grid,Stat} from '../../components/styled/styled';
import {Link} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import '../Countries/countries.scss';
import { numberWithCommas } from "../Countries/Country";
import Skeleton from "react-loading-skeleton";
import { getHistoricalDataContry } from "../../utils/dataOpsWM";
import moment from 'moment';
import TinyLineChart from "../../components/TinyLinechart/TinyLineChart";
import BarStats from "../../components/charts/BarStats";

class CountryDetails extends Component {

    state = {
        data: null,
        historicalData: null
    }
  async componentDidMount() {
    const data = await axios
      .get(conf.api + "/countries/" + this.props.match.params.countryName)
      .then(r => r.data);
    this.setState({
      data: data
    });
    this.getTimeline(this.props.match.params.countryName)
  }

  getTimeline = async (country) => {
    const data = await getHistoricalDataContry(country)
    this.setState({
        historicalData: data
    })
  }


  render() {
    return (
          <div className="countries">
          <div className="controls">
                <div className="search-control">
                    <div className="top-controls">

                            <Link to="/countries" className="back">
                                <Icon 
                                size="md" type="left"/>
                                Back
                            </Link>
                    </div>
                </div>
            </div>

            {
                
                <Inc style={{marginTop:80}}>
                    {this.state.data &&
                    <Head>
                        <div>
                            <img
                                style={{ height: 30, marginRight: 5 }}
                                src={this.state.data.countryInfo.flag}
                                alt="Country"
                            />
                        </div>
                        <div style={{fontSize:20,fontWeight:400,marginTop:10,color:'#7c7c7c'}}>
                            {this.state.data.country.toUpperCase()}
                        </div>
                        <div style={{fontSize:20,fontWeight:400,marginTop:10}}>
                        {
                            numberWithCommas(this.state.data.cases)
                        }
                        <small>(&#8593;{numberWithCommas(this.state.data.todayCases)})</small>
                        </div>
                    </Head>}

                    {this.state.data &&
                        <Grid>
                        <Stat color="#EB9B25">
                            <div className="num">
                            {
                                numberWithCommas(this.state.data.active)
                            }
                            </div>
                            <div className="case">Cases</div>
                        </Stat>
                        <Stat color="#3B8313">
                            <div className="num">{numberWithCommas(this.state.data.recovered)}</div>
                            <div className="case">Recovered</div>
                        </Stat>
                        <Stat color="#C31112">
                            <div className="num">
                            {numberWithCommas(this.state.data.deaths)}{" "}
                            <small>&#8593;{numberWithCommas(this.state.data.todayDeaths)}</small>
                            </div>
                            <div className="case">Death</div>
                        </Stat>

                        <Stat color="#EB5569">
                            <div className="num">
                            {numberWithCommas(this.state.data.critical)}
                            <small> &nbsp;{
                                ((this.state.data.critical / this.state.data.cases)*100).toFixed(0)
                            }%</small>
                            </div>
                            <div className="case">Critical</div>
                        </Stat>
                        <Stat color="#3B8313">
                            <div className="num">
                                {
                                     ((this.state.data.deaths / this.state.data.cases)*100).toFixed(0)
                                }%
                            </div>
                            <div className="case">Mortality Rate</div>
                        </Stat>
                        <Stat color="#C31112">
                            <div className="num">
                                {this.state.data.deathsPerOneMillion}
                            </div>
                            <div className="case">Death Per 1M</div>
                        </Stat>
                    </Grid>
                    }
                    <div className="timeline">
                    {
                            this.state.historicalData ?
                            <>
                                <span className="header">
                                    Timeline :
                                        {
                                            moment(this.state.historicalData[0].name).format('MMM Do')
                                        }
                                        -
                                        {
                                            moment(this.state.historicalData[this.state.historicalData.length-1].name).format('MMM Do')
                                        }
                                </span>
                                
                                <TinyLineChart 
                                    data={this.state.historicalData}
                                    height={100}
                                    width={window.screen.width-50}
                                />
                            </>:
                            <Skeleton height={100} width={window.screen.width-40} />
                        }
                    
                    </div>

                    <div className="timeline">
                        {
                            this.state.historicalData &&
                            <BarStats 
                                height={200}
                                width={window.screen.width-50}
                                margin={{top: 0, right: 0, left: 0, bottom: 0}}
                                dataKey="name"
                                refStroke="#7c7c7c"
                                brushStroke="#7c7c7c"
                                keys={[
                                    {name: "cases",color: "#EB9B1B"},
                                    {name: "deaths",color: "#C31111"}
                                ]}
                                data={this.state.historicalData}
                            />
                        }
                    </div>
                    
                </Inc>
                
            }
          </div>
    );
  }
}

export default CountryDetails;
