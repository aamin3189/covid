import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TotalCountry = styled.div`
    font-size:20px;
    font-weight: 400;
`
const Info = styled.div`
    font-size: 10px;
    color: #666666;
    line-height: 12px;
`

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 11px;
    color: #EB5569;
`

const TOTAL_NUM_OF_COUNTRIES =198;

class CountryTile extends Component {

    render() {
        return (
                <Container onClick={()=>this.props.history.push("/countries")}>
                    <TotalCountry>
                        {/* <img style={{height:12}} src={require('./blink.gif')} alt="blink" /> */}
                        {this.props.total}
                        {/* <small style={{color:"#666"}}> {
                            ((this.props.total/TOTAL_NUM_OF_COUNTRIES)*100).toFixed(0)
                        }%</small> */}
                    </TotalCountry>
                    <Info>
                        Countries Worldwide
                    </Info>
                    {/* <Link to="/countries">
                        View Details
                    </Link> */}
                </Container>
        );
    }
}

CountryTile.propTypes = {
    total: PropTypes.number
};

export default CountryTile;