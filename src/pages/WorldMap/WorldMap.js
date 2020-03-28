import React, { Component } from 'react';
import '../Countries/countries.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MapDiv = styled.div`
    transform: rotate(-90deg);
    margin-top: 50%;
    text-align:center;
    .title{
        color:#7c7c7c;
        padding-bottom:20px;
        font-size:14px
    }
`

class WorldMap extends Component {

    componentDidMount(){
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {

            var data = localStorage.getItem("countries");
            data = JSON.parse(data);
            var arr = [
                ['Country', 'Infected']
            ]
            for(let i= 0 ; i< data.length; i++){
                data[i].country = data[i].country == "USA" ? "United States": data[i].country
                arr.push([
                    data[i].country.toUpperCase(),
                    data[i].cases
                ])
            };
            /*
            [
                        ['Country', 'Popularity'],
                        ['Germany', 200],
                        ['United States', 300],
                        ['Brazil', 400],
                        ['Canada', 500],
                        ['France', 600],
                        ['RU', 700],
                        ['INDIA',1500]
                        ]
            */
            var data = google.visualization.arrayToDataTable(arr);

            var options = {
                colorAxis: {minValue: 0,  colors: ['#E57180', '#C31112']}
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    }
    render() {
        return (
            <>
                <MapDiv>
                    <div className="title">COVID-19 World map</div>
                    <div id="regions_div">

                    </div>
                </MapDiv>
                <Link to="/">
                    <i className="fa fa-chevron-down back-icon"></i>
                </Link>
            </>
        );
    }
}

export default WorldMap;