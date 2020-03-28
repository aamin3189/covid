import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, List } from 'antd-mobile';
import Axios from 'axios';
import styled from 'styled-components';
const Summary = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-left: 17px;
    font-size:12px;
    margin-top: 10px;
    div:nth-child(1){
        color: #EB9B25
    }
    div:nth-child(2){
        color: #3B830D;
        text-align:center
    }
    div:nth-child(3){
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
                            <span style={{float:'right'}}>{this.state.data[st].districtData[district].confirmed}</span>
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
                {
                    this.state.data &&
                    <Accordion className="my-accordion" onChange={this.onChange}>
                        {
                            this.state.states.map((st,index)=>(
                                <Accordion.Panel header={`${st.state} (${st.confirmed})`} key={index}>
                                    <Summary>
                                        <div>
                                            Active: {st.active}
                                        </div>
                                        <div>
                                            Recoverd: {st.recovered}
                                        </div>
                                        <div>
                                            Deaths: {st.deaths}
                                        </div>
                                    </Summary>
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