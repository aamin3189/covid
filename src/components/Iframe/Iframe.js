import React, { Component } from 'react';
import styled from 'styled-components';
import Skeleton from "react-loading-skeleton";

const Frame = styled.iframe`
border: none;
min-height: ${props => props.height || "400px"};
width: 100%;
margin-bottom:30px;
`

class Iframe extends Component {

    state = {
        loading: true
    }
    onLoad(){
        this.setState({
            loading: false
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.loading &&
                    <Skeleton height={400} width="100%" />
                }
                <Frame height={this.props.height} onLoad={this.onLoad.bind(this)} src={this.props.src} />
            </div>
        );
    }
}

export default Iframe;


