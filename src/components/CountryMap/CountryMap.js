import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/countries/in/in-all.geo.json";
import { getIndiaStats } from '../../utils/dataOpsWM';
import _ from 'underscore';

highchartsMap(Highcharts); // Initialize the map module

if (typeof window !== "undefined") {
  window.proj4 = window.proj4 || proj4;
}


var data = [
    ['in-py', 0],
    ['in-ld', 1],
    ['in-wb', 2],
    ['in-or', 3],
    ['in-br', 4],
    ['in-sk', 5],
    ['in-ct', 6],
    ['in-tn', 7],
    ['in-mp', 8],
    ['in-2984', 9],
    ['in-ga', 10],
    ['in-nl', 11],
    ['in-mn', 12],
    ['in-ar', 13],
    ['in-mz', 14],
    ['in-tr', 15],
    ['in-3464', 16],
    ['in-dl', 17],
    ['in-hr', 18],
    ['in-ch', 19],
    ['in-hp', 20],
    ['in-jk', 21],
    ['in-kl', 22],
    ['in-ka', 40],
    ['in-dn', 24],
    ['in-mh', 25],
    ['in-as', 26],
    ['in-ap', 27],
    ['in-ml', 28],
    ['in-pb', 29],
    ['in-rj', 30],
    ['in-up', 31],
    ['in-ut', 32],
    ['in-jh', 33]
];


const mapOptions = {
    
        chart: {
            map: 'countries/in/in-all'
        },
    
        title: {
            text: null
        },
    
        mapNavigation: {
            enabled: false,
        },
    
        colorAxis: {
            min: 0
        },
    
        series: [
            {
                data: data,
                mapData: mapDataIE,
                name: 'Random data',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }
        ]
    
};



class CountryMap extends Component {
    state = {
        mapOptions: null
    }

    async componentDidMount(){
        getIndiaStats().then(resp=>{
            this.generateData(resp.statewise)
        })
    }


    generateData(stateData){
        let arr = []
        // for(let i = 1; i < stateData.length; i++){
        //     arr.push(
        //         [
        //             `in-${stateData[i].statecode.toLowerCase()}`,
        //             stateData[i].confirmed
        //         ]
        //     )
        // }

        for(let i =0 ;i < data.length; i++){
            data[i][1] = parseInt(data[i][1])
            let state = data[i][0].split("-");
            state = state[1].toUpperCase();

            const inx = _.findIndex(stateData,(x)=>{
                return x.statecode == state
            })

            if(inx > -1){
                data[i][1] = parseInt(stateData[inx].confirmed)
            }
        }

        let max = _.max(data,x=>x[1])
        let min = _.min(data,x=>x[1])

        let mapOptions = {
    
            chart: {
                map: 'countries/in/in-all'
            },
        
            title: {
                text:"India Statewise"
            },
        
            mapNavigation: {
                enabled: true,
            },
        
            colorAxis: {
                min: min[1],
                max: max[1]
            },
        
            series: [
                {
                    data: data,
                    mapData: mapDataIE,
                    name: 'Cases',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}'
                    }
                }
            ]
        
        };
        this.setState({
            mapOptions: mapOptions
        })
    }


    render() {
        return (
            <div>
                {
                    this.state.mapOptions &&
                    <HighchartsReact
                        constructorType={"mapChart"}
                        highcharts={Highcharts}
                        options={this.state.mapOptions}
                    />
                }
            </div>
        );
    }
}

export default CountryMap;