import React, { Component } from 'react';
import './dashboard.v1.scss';
import Bulet from '../../components/Bulet/Bulet';
import { getTotalStats,historicalData,getDetailedStats } from '../../utils/dataOpsWM';
import NDonut from '../../components/charts/Donut';
import TinyLineChart from '../../components/TinyLinechart/TinyLineChart';
import CountryTile from '../../components/CountryTile/CountryTile';
import IndividualCountry from '../../components/CountryTile/IndividualCountry';

class DashboardV1 extends Component {

    state = {
        stats: null,
        totalStats: null,
        loading: true,
        historicalData: null
    };

    componentDidMount(){
        getTotalStats().then(data=>{
            this.setState({
                stats: data.stats,
                total: data.total
            })
        })
        historicalData().then((data)=>{
            this.setState({
                historicalData: data
            })
        })

        getDetailedStats().then(data=>{
            this.setState({
                totalStats: data
            })
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
                        Novel Coronavirus (COVID-19) Situation
                    </span>
                </div>
                <div className="top">
                    <div style={{marginTop:15}}>
                        { this.state.totalStats &&
                            <>
                            <Bulet 
                                color={"#EB9B25"}
                                title={"Active Case"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.active)}
                                count={0}
                            />

                            <Bulet 
                                color={"#3B8313"}
                                title={"Recovered"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.active)}
                                count={0}
                            />

                            <Bulet 
                                color={"#EB9B25"}
                                title={"Active Case"}
                                mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.active)}
                                count={0}
                            />
                            </>
                        }
                    
                    </div>
                    <div>
                        {
                            this.state.stats &&
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
                        }
                    </div>
                </div>
                <div className="timeline">
                    <span className="header">Timeline</span>
                    {
                        this.state.historicalData &&
                        <TinyLineChart 
                            data={this.state.historicalData}
                            height={100}
                            width={window.screen.width-50}
                        />
                    }
                </div>
                <div className="countries">
                    <div className='india flex-box'>
                        <CountryTile country="india" />
                    </div>
                    <div className="other-countries"> 
                        <IndividualCountry countryName="india" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardV1;