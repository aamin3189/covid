import React, { Component } from 'react';
import './dashboard.v1.scss';
import Bulet from '../../components/Bulet/Bulet';
import { getTotalStats,historicalData,getDetailedStats,getIndiaStats,getZones,gethistoricalAll } from '../../utils/dataOpsWM';
import NDonut from '../../components/charts/Donut';
import TinyLineChart from '../../components/TinyLinechart/TinyLineChart';
import CountryTile from '../../components/CountryTile/CountryTile';
import IndividualCountry from '../../components/CountryTile/IndividualCountry';
import moment from 'moment';
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';
import Tile, {EventTile} from '../../components/Tile/Tile';
import IndiaTile from '../../components/CountryTile/IndiaTile';
import UpArrow from '../../components/UpArrow/UpArrow';
import _ from 'underscore';
import Axios from 'axios';
import SeacrhLocation from './SeacrhLocation';
import CustomBar from '../../components/CustomBar/CustomBar';

class DashboardV1 extends Component {

    state = {
        stats: null,
        totalStats: null,
        loading: true,
        historicalData: null,
        india: null,
        zones: null,
        lineSeries: null
    };

    componentDidMount(){
        this.getData();
        this.getIndiaData();
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
        });
        this.getIndiaData();

        gethistoricalAll().then(data=>{
            this.setState({
                lineSeries: data
            })
        })
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Get india statistics 
    async getIndiaData(){
        getIndiaStats().then(data=>{
            this.setState({
                india: data
            })
        })
    }

    // Get the zones
    async getDistrictZones(){
        getZones().then(resp=>{
            this.setState({
                zones: resp
            })
        })
    }

    getLocation(){
        
    }

    
    render() {
        return (
            <div className="db-v1">
                <div>
                    <span className="head-text">
                        {/* <img height={20} src={require('./covid-19.svg')} alt="applogo" /> */}
                        COVID-19 Situation
                    </span>
                    <i className="fa fa-refresh refresh-icon" onClick={this.getData.bind(this)} aria-hidden="true"></i>
                    <a  href="https://wa.me/whatsappphonenumber/?text=https://aamin3189.github.io/covid" >
                        <i style={{marginRight:'20px',color: "#52a026",fontWeight: "bold"}} className="fa fa-whatsapp refresh-icon"></i>
                    </a>
                </div>
                <div className="top">

                    <div>
                     {this.state.stats ?
                        <CustomBar 
                            data={this.state.stats}
                            dataKey="percentage"
                        />
                        :
                        <Skeleton active />
                    }
                        
                    </div>

                    <div style={{marginTop:15}} className="bullet-container">
                        { this.state.totalStats ?
                            <Bulet 
                                color={"#EB9B25"}
                                title={"Active Case"}
                                series={this.state.lineSeries.cases}
                                // mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.active)}
                                mainNumber={`${(this.state.totalStats.totalStats.active/1000000).toFixed(1)}M`}
                                count={
                                    <span>
                                        <UpArrow size={10} color="#7C7C7C" />{`${this.numberWithCommas(this.state.totalStats.totalStats.newCases)} New`}
                                    </span>
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
                                series={this.state.lineSeries.recovered}
                                // mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.recovered)}
                                mainNumber={`${(this.state.totalStats.totalStats.recovered/1000000).toFixed(1)}M`}
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
                                series={this.state.lineSeries.deaths}
                                // mainNumber={this.numberWithCommas(this.state.totalStats.totalStats.deaths)}
                                mainNumber={`${(this.state.totalStats.totalStats.deaths/1000000).toFixed(1)}M`}
                                count={
                                    <span>
                                        <UpArrow size={10} color="#7C7C7C" />{`${this.numberWithCommas(this.state.totalStats.totalStats.newDeaths)} New`}
                                    </span>
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
                    {/* <div>
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
                    </div> */}
                </div>
                {/* <div className="timeline">
                    {
                        this.state.historicalData ?
                        <>
                            <span className="header">
                                Timeline :
                                    {
                                        moment(this.state.historicalData[0].name).format('MMM DD')
                                    }
                                    -
                                    {
                                        moment(this.state.historicalData[this.state.historicalData.length-1].name).format('MMM DD')
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
                
                </div> */}
                <div className="countries">
                    { this.state.totalStats && this.state.india &&
                        <>
                            {/* <div className='india flex-box'>
                                <CountryTile history={this.props.history} country="india" total={this.state.totalStats.countries.length} />
                            </div> */}
                            <div className="other-countries"> 
                                {/* <IndividualCountry 
                                    history={this.props.history} 
                                    countryName="india" 
                                    data={this.state.india}
                                /> */}
                                <IndiaTile 
                                    history={this.props.history} 
                                    countryName="india" 
                                    data={this.state.india}
                                />
                            </div>
                        </>
                    }
                </div>

                {this.state.totalStats && 
                <div className="extra-links">
                    <Tile history={this.props.history} className="fa fa-globe" title={`Countries(${this.state.totalStats.countries.length})`} to="/countries" />
                    <br/>
                    <Tile history={this.props.history} className="fa fa-map" title="World Map" to="/map" />
                    <br/>
                    {/* <EventTile 
                        onClick={()=>this.setState({showModal: true})}
                        history={this.props.history} 
                        className="fa fa-question-circle" 
                        title="My Corona Zone"  
                    /> */}
                </div>}


                {/* <div className="precutions">
                    <img style={{width:'100%'}} src={require("./safty.png")} alt="safty" />
                </div> */}
                <div className="banner">
                    <img style={{width:'100%'}} src={require("./StayHome.jpg")} alt="safty" />
                </div>
                <div style={{textAlign:'center'}}>
                    <Link to="credits" style={{color: "#EB5569"}}>
                        Credits
                    </Link>
                </div>

                {
                    this.state.showModal && 
                    <SeacrhLocation />
                }

                
            </div>
        );
    }
}

export default DashboardV1;