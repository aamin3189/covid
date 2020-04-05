import React, { Component } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import CountryMap from '../../components/CountryMap/CountryMap';

class IndiaMap extends Component {
    render() {
        return (
            <div>
                <TopNav to={"/india"} />
                <div style={{marginTop:'50px'}}>
                    <CountryMap />
                </div>
            </div>
        );
    }
}

export default IndiaMap;