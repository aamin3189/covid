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
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 11px;
`


class CountryTile extends Component {

    render() {
        return (
                <Container>
                    <TotalCountry>
                        {this.props.countryCount} &nbsp;
                        <small style={{color:"#666"}}>{
                            this.props.countryPer
                        }</small>
                    </TotalCountry>
                    <Info>
                        Countries, areas or teritories with cases
                    </Info>
                    <Link to="/stats">
                        View Details
                    </Link>
                </Container>
        );
    }
}

CountryTile.propTypes = {
    countryPer: PropTypes.number,
    countryCount: PropTypes.number,
};

export default CountryTile;