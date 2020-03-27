import React, { Component } from 'react';
import Country from './Country';
import {SearchBar,Icon} from 'antd-mobile';
import './countries.scss';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import IndividualCountry from '../../components/CountryTile/IndividualCountry';

class Countries extends Component {
    state = {
        countries: []
    }
    componentDidMount(){
        this.setState({
            countries: JSON.parse(localStorage.getItem("countries"))
        })
    }
    search(e){
        let data = this.getResult(this.state.countries,'country',e)
        this.setState({
            countries: data
        })
    }

    getResult(arr,keyToFilter, valueStartsWith){
        return _.filter(JSON.parse(localStorage.getItem("countries")), function(d){ 
            return d[keyToFilter].toLowerCase().startsWith(valueStartsWith) ||
            d[keyToFilter].toUpperCase().startsWith(valueStartsWith) ||
            d[keyToFilter].startsWith(valueStartsWith);
        })
    }
    clearSearch(){
        this.setState({
            countries: JSON.parse(localStorage.getItem("countries"))
        })
    }
    render() {
        return (
            <div className="countries">
                <div className="controls">
                    <div className="search-control">
                        <div className="top-controls">

                                <Link to="/" className="back">
                                    <Icon 
                                    size="md" type="left"/>
                                    Dashboard
                                </Link>
                                <Link to="/worldmap" style={{marginRight:'10px'}}>
                                    World map
                                </Link>
                        </div>
                        <SearchBar
                            placeholder="Search" maxLength={5} 
                            cancelText="Clear"
                            onChange={this.search.bind(this)}
                            onCancel={this.clearSearch.bind(this)}
                            onClear={true}
                        />
                    </div>
                </div>
                <div className="list">
                    {
                        this.state.countries.length > 0 &&
                        this.state.countries.map((c,i)=>
                            <Country 
                                key={i}
                                countryObj={c}
                            />
                            // <IndividualCountry 
                            //     history={this.props.history}
                            //     countryObj={c}
                            // />
                        )
                    }
                </div>
            </div>
        );
    }
}

Countries.propTypes = {

};

export default Countries;