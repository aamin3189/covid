import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import '../Countries/countries.scss';

class WorldMap extends Component {
    render() {
        return (
            <div>
                <div className="controls">
                    <div className="search-control">
                        <div className="top-controls">

                                <Link to="/countries" className="back">
                                    <Icon 
                                    size="md" type="left"/>
                                    Countries
                                </Link>
                        </div>
                    </div>
                </div>
                <img style={{width: window.screen.width,marginTop: window.screen.height/4}} alt="World Map" src="https://ssl.gstatic.com/onebox/sos/coronavirus/maps/corona_map.png" />
                <img style={{width:window.screen.width}} src={require('./scale.png')} />
            </div>
        );
    }
}

export default WorldMap;