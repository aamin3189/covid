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

class CountryDetails extends Component {

    state = {
        data: null
    }
  async componentDidMount() {
    const data = await axios
      .get(conf.api + "/countries/" + this.props.match.params.countryName)
      .then(r => r.data);
    this.setState({
      data: data
    });
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
                this.state.data ?
                <Inc style={{marginTop:80}}>
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
                        </div>
                    </Head>

                    <Grid>
                        <Stat color="#EB9B25">
                            <div className="num">
                            {
                                numberWithCommas(this.state.data.active)
                            }
                            <small>+{numberWithCommas(this.state.data.todayCases)}</small>
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
                            <small>+{numberWithCommas(this.state.data.todayDeaths)}</small>
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
                </Inc>
                :
                <div style={{marginTop:60}}>
                    <Skeleton height={window.screen.height-100} width={window.screen.width-20} />
                </div>
            }
          </div>
    );
  }
}

export default CountryDetails;
