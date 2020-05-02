import React, { Component } from 'react';
import { Accordion, List } from 'antd-mobile';
import Axios from 'axios';
import styled from 'styled-components';
import './statewise.scss';
import UpArrow from '../UpArrow/UpArrow';

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
        color: #EB9B25;
        .delta{
            /* color: #FFF; */
            /* background-color: #EB9B25; */
            border-radius:10px;
            text-align:center;
            padding-right:5px;
            font-size:12px;
            margin-left:5px;
        }
    }
    div:nth-child(3){
        color: #3B830D;
        text-align:center;
        .delta{
            /* color: #FFF; */
            /* background-color: #3B830D; */
            border-radius:10px;
            text-align:center;
            padding-right:5px;
            font-size:12px;
            margin-left:5px;
        }
    }
    div:nth-child(4){
        color: #C31111;
        text-align:right;
        margin-right: 12px;
        .delta{
            /* color: #FFF; */
            /* background-color: #C31111; */
            border-radius:10px;
            text-align:center;
            padding-right:5px;
            font-size:12px;
            margin-left:5px;
        }
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
                                        <Summary style={{width:'113%'}}>
                                            <div>
                                                {st.confirmed}
                                                {
                                                    st.deltaconfirmed > 0 &&
                                                    <span className="delta">
                                                        &nbsp;<UpArrow color="#000" size={10} />
                                                        {st.deltaconfirmed}
                                                    </span>
                                                }
                                            </div>
                                            <div>
                                                {st.active} 
                                            </div>
                                            <div>
                                                {st.recovered}
                                                {
                                                    st.deltarecovered > 0 &&
                                                    <span className="delta">
                                                        &nbsp;
                                                        <UpArrow color="#3B830D" size={10} />
                                                        {st.deltarecovered}
                                                    </span>
                                                }
                                            </div>
                                            <div>
                                                {st.deaths}
                                                {
                                                    st.deltadeaths > 0 &&
                                                    <span className="delta"> 
                                                        &nbsp;
                                                        <UpArrow color="#C31111" size={10} />
                                                        {st.deltadeaths}
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