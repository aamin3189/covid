import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, List } from 'antd-mobile';
import Axios from 'axios';
import styled from 'styled-components';
const Summary = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-left: 1px;
    font-size: 12px;
    margin-top: -14px;

    div:nth-child(1){
        color: #000;
        font-weight:500;
    }
    div:nth-child(2){
        color: #EB9B25
    }
    div:nth-child(3){
        color: #3B830D;
        text-align:center
    }
    div:nth-child(4){
        color: #C31111;
        text-align:right;
        margin-right: 12px;
    }
`

class StateWise extends Component {

    state = {
        data: null
    }
    componentDidMount(){
        Axios.get("https://api.covid19india.org/state_district_wise.json").then((resp)=>{
            this.setState({
                data: resp.data
            })
        })
        let dxt = this.props.agregatedData
        dxt.splice(0,1)
        this.setState({
            states: dxt
        })
    }

    getDistricts = (st) => {
        if(typeof this.state.data[st] !== "undefined"){
            return Object.keys(this.state.data[st].districtData).map((district,innerIndex)=>(
                    <List.Item key={innerIndex}>
                        <div style={{color:"#7c7c7c"}}>
                            <span>{district} </span>
                            <span style={{float:'right'}}>
                                {this.state.data[st].districtData[district].confirmed} &nbsp;
                                {
                                    this.state.data[st].districtData[district].delta.confirmed > 0 &&
                                    <span style={{color:"#C31111"}}>
                                        &#8593;{this.state.data[st].districtData[district].delta.confirmed}
                                    </span>
                                }
                            </span>
                        </div>
                    </List.Item>
            ))
        } else {
            return null
        }

    }

    
    render() {
        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Summary style={{marginTop:'10px',marginBottom:'10px'}}>
                        <div>
                            Total
                        </div>
                        <div>
                            Active
                        </div>
                        <div>
                            Recovered
                        </div>
                        <div>
                            Deaths
                        </div>
                </Summary>
                {
                    this.state.data &&
                    <Accordion className="my-accordion" onChange={this.onChange}>
                        {
                            this.state.states.map((st,index)=>(
                                st.active > 0 &&
                                <Accordion.Panel header={
                                    <div>
                                        <div>
                                            <span style={{color: "#5a5959"}}>
                                                {st.state}
                                            </span>
                                            <span style={{float:'right',marginRight:2}}>
                                                
                                            </span>
                                        </div>
                                        <Summary>
                                            <div>
                                                {st.confirmed}
                                            </div>
                                            <div>
                                                {st.active} 
                                                {
                                                    st.delta.active > 0 &&
                                                    <span>
                                                        &nbsp;&#8593;{st.delta.active}
                                                    </span>
                                                }
                                            </div>
                                            <div>
                                                {st.recovered}
                                                {
                                                    st.delta.recovered > 0 &&
                                                    <span>
                                                        &#8593; {st.delta.recovered}
                                                    </span>
                                                }
                                            </div>
                                            <div>
                                                {st.deaths}
                                                {
                                                    st.delta.deaths > 0 &&
                                                    <span>
                                                        &#8593; {st.delta.deaths}
                                                    </span>
                                                }
                                            </div>
                                        </Summary>
                                    </div>
                                } key={index}>
                                    
                                    <List className="my-list">
                                        {
                                            this.getDistricts(st.state)
                                        }
                                    </List>
                                </Accordion.Panel>
                            ))
                        }
                        
                    
                    </Accordion>
                }
            </div>
        );
    }
}

StateWise.propTypes = {

};

export default StateWise;