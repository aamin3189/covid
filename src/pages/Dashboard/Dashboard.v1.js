import React, { Component } from 'react';
import './dashboard.v1.scss';
import Bulet from '../../components/Bulet/Bulet';
import { getTotalStats,historicalData,getDetailedStats } from '../../utils/dataOpsWM';
import NDonut from '../../components/charts/Donut';
import TinyLineChart from '../../components/TinyLinechart/TinyLineChart';
import CountryTile from '../../components/CountryTile/CountryTile';
import IndividualCountry from '../../components/CountryTile/IndividualCountry';
import moment from 'moment';
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';

class DashboardV1 extends Component {

    state = {
        stats: null,
        totalStats: null,
        loading: true,
        historicalData: null
    };

    componentDidMount(){
        this.getData();
    }

    getData(){

        this.setState({ 
            stats: null,
            totalStats: null,
            total: true 
        });

        getTotalStats().then(data=>{
            this.setState({
                stats: data.stats,
                total: data.total
            });
            window.scrollTo(0, 0)
        })
        historicalData().then((data)=>{
            this.setState({
                historicalData: data
            })
        })

        getDetailedStats().then(data=>{
            this.setState({
                totalStats: data
            });
            localStorage.setItem("countries", JSON.stringify(data.countries));
        })
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
            <div className="db-v1">
                <div>
                    <span className="head-text">
                        COVID-19 Situation
                    </span>
                    <i class="fa fa-refresh refresh-icon" onClick={this.getData.bind(this)} aria-hidden="true"></i>

                </div>
                <div className="top">
                    <div style={{marginTop:15}}>
                        { this.state.totalStats ?
                            <Bulet 
                                color={"#EB9B25"}
                                title={"Active Case"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.active)}
                                count={
                                    `+${this.numberWithCommas(this.state.totalStats.totalStats.newCases)} New`
                                }
                            />
                            :
                            <Skeleton 
                                count={3}
                                width={"70%"}
                            />
                        }
                        { this.state.totalStats ?
                            <Bulet 
                                color={"#3B8313"}
                                title={"Recovered"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.recovered)}
                                count={`${(
                                    (this.state.totalStats.totalStats.recovered / this.state.totalStats.totalStats.cases) *
                                    100
                                  ).toFixed(0)}% recovered`}
                            />
                            :
                            <Skeleton 
                                count={2}
                                width={"70%"}
                                style={{marginBotton: 5}}
                            />
                        }
                        { this.state.totalStats ?
                            <Bulet 
                                color={"#C31112"}
                                title={"Death"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.deaths)}
                                count={
                                    `+${this.numberWithCommas(this.state.totalStats.totalStats.newDeaths)} New`
                                }
                            />
                            :
                            <Skeleton 
                                count={3}
                                width={"70%"}
                                style={{marginBotton: 5}}
                            />
                        }
                    
                    </div>
                    <div>
                        {
                            this.state.stats ?
                            <NDonut 
                                width={window.screen.width/2} 
                                height={200}
                                cx={window.screen.width / 4.5}
                                cy={90}
                                innerRadius={60}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                                data={this.state.stats}
                                total={this.state.total}
                                cornerRadius={40}
                            />
                            :
                            <div style={{ marginTop: 0 }}>
                                <Skeleton circle={true} height={130} width={130} />
                            </div>
                        }
                    </div>
                </div>
                <div className="timeline">
                    {
                        this.state.historicalData ?
                        <>
                            <span className="header">
                                Timeline :
                                    {
                                        moment(this.state.historicalData[0].name).format('MMM Do YYYY')
                                    }
                                    -
                                    {
                                        moment(this.state.historicalData[this.state.historicalData.length-1].name).format('MMM Do YYYY')
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
                <div className="countries">
                    { this.state.totalStats &&
                        <>
                            <div className='india flex-box'>
                                <CountryTile history={this.props.history} country="india" total={this.state.totalStats.countries.length} />
                            </div>
                            <div className="other-countries"> 
                                <IndividualCountry history={this.props.history} countryName="india" />
                            </div>
                        </>
                    }
                </div>
                <div className="precutions">
                    <img style={{width:'100%'}} src={require("./safty.png")} alt="safty" />
                </div>
                <div className="banner">
                    <img style={{width:'100%'}} src={require("./banner.png")} alt="safty" />
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="dashboard-v0" style={{color: "#EB5569"}}>
                        Old Dashboard >
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashboardV1;