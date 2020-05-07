import React, { Component } from 'react';
import Country from './Country';
import {SearchBar,Icon} from 'antd-mobile';
import './countries.scss';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import CommonModal from '../../components/Modal/CommonModal';
import Axios from 'axios';
import conf from '../../config/config';
import Skeleton from 'react-loading-skeleton';


class Countries extends Component {
    state = {
        countries: [],
        showModal: false,
        selected: "Total"
    }
    componentDidMount(){
        window.scrollTo(0,0);
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


    sortData(sortBy){
        let whichSort = null;
        if(sortBy == "Total"){
            whichSort = "cases"
        } else if(sortBy == "Active Case"){
            whichSort = "active"
        } else if( sortBy == "Deaths"){
            whichSort = "deaths"
        } else if( sortBy == "Recovered"){
            whichSort = "recovered"
        } else if( sortBy == "Death per 1 Million"){
            whichSort = "deathsPerOneMillion"
        } else if( sortBy == "New Cases"){
            whichSort = "todayCases"
        } else if( sortBy == "New Deaths"){
            whichSort = "todayDeaths"
        }



        Axios.get(`${conf.api}/countries?sort=${whichSort}`).then((resp)=>{
            this.setState({
                countries: resp.data
            });
            window.scrollTo(0,0);   
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
                                <span onClick={()=>this.setState({showModal:true})} style={{marginRight:'10px'}}>
                                    Sort By ({this.state.selected}) &nbsp;
                                    <i class="fa fa-sort" aria-hidden="true"></i>
                                </span>
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
                        this.state.countries.length > 0 ?
                        this.state.countries.map((c,i)=>
                            <Country 
                                key={i}
                                countryObj={c}
                            />
                        )
                        :
                        <Skeleton 
                            height={10}
                            width={window.screen.width}
                            count={20}
                        />
                    }
                </div>
                <CommonModal 
                    visible={this.state.showModal}
                    onClose={()=>{
                        this.setState({showModal:false})
                    }}
                    afterClose={()=>{
                        this.sortData(this.state.selected)
                    }}
                    header={"Sort By"}
                    data={["Total","Active Case","Deaths","New Deaths","New Cases","Death per 1 Million","Recovered"]}
                    selectSort={(e)=>this.setState({selected:e})}
                    selected={this.state.selected}
                />
            </div>
        );
    }
}

Countries.propTypes = {

};

export default Countries;