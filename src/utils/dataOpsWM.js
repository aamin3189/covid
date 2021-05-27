import Axios from 'axios';
import _ from 'underscore';
import conf from '../config/config';
import moment from 'moment';

const getDetailedStats = async () => {
    let totalStats = {
      cases: 0,
      newCases: 0,
      deaths: 0,
      newDeaths: 0,
      recovered: 0,
      active: 0,
      critical: 0
    };

    const data = await Axios.get(`${conf.api}/v2/countries?sort=cases`).then(resp => {
      let countries = resp.data;
      for (let i = 0; i < countries.length; i++) {
        totalStats.cases += countries[i].cases;
        totalStats.newCases += countries[i].todayCases;
        totalStats.deaths += countries[i].deaths;
        totalStats.newDeaths += countries[i].todayDeaths;
        totalStats.recovered += countries[i].recovered;
        totalStats.active += countries[i].active;
        totalStats.critical += countries[i].critical;
      }
      return {
        totalStats,
        countries,
        loading: false,
        india:  _.find(countries,(d)=>{
          return d.country == 'India'
        })
      }
    });
    return data;
  };

const  getTotalStats = async () => {
  const data = await Axios.get(`${conf.api}/v2/all`).then(resp => {
    const apiData = resp.data;
    //format data
    let stats = [
      {
        name: "Active Case",
        value: apiData.active,
        color: "#EB9B1B",
        percentage: (apiData.active/apiData.cases)*100
      },
      {
        name: "Recovered",
        value: apiData.recovered,
        color: "#3B830D",
        percentage: (apiData.recovered/apiData.cases)*100
      },
      {
        name: "Deaths",
        value: apiData.deaths,
        color: "#C31111",
        percentage: (apiData.deaths/apiData.cases)*100
      }
    ];
    return {
      stats: stats,
      total: apiData.cases,
      apiData: apiData
    }
  });
  return data
};


const getZones = async () => {
  const data = await Axios.get("https://api.covid19india.org/zones.json").then(resp=>{
    return resp.data.zones
  })
  return data;
}


const historicalData = async () => {
  const data  = await Axios.get("https://corona.lmao.ninja/v2/historical").then((resp)=>{
    return resp.data
  });

  // do agreegate
  let tx = {
    cases: {}, recovered: {}, deaths: {}
  }

  Object.keys(data[0].timeline.cases).forEach(element => {
    tx.cases[element] = 0;
    tx.recovered[element] = 0
    tx.deaths[element] = 0
  })

  for(let i = 0; i< data.length; i++){
    
    Object.keys(data[0].timeline.cases).forEach(element => {
      tx.cases[element] += data[i].timeline.cases[element] == undefined ? 0 : isNaN(parseInt(data[i].timeline.cases[element]))? 0 : parseInt(data[i].timeline.cases[element])
      tx.recovered[element] += data[i].timeline.recovered[element] == undefined ? 0 : isNaN(parseInt(data[i].timeline.recovered[element]))? 0 : parseInt(data[i].timeline.recovered[element])
      tx.deaths[element] += data[i].timeline.deaths[element] == undefined ? 0 : isNaN(parseInt(data[i].timeline.deaths[element])) ? 0 : parseInt(data[i].timeline.deaths[element])
    });

  }

  let arr = [];


  Object.keys(tx.cases).forEach(key => {
    arr.push({
      name: key,
      deaths: tx.deaths[key],
      cases: tx.cases[key],
      recovered: tx.recovered[key]
    })
  })

  return arr

}


const getHistoricalDataContry = async (country) => {
  const data  = await Axios.get("https://corona.lmao.ninja/v2/historical/"+country).then((resp)=>{
    return resp.data
  });
  let arr = [];


  Object.keys(data.timeline.cases).forEach(key => {
    arr.push({
      name: moment(key).format("MMM DD"),
      deaths: data.timeline.deaths[key],
      cases: data.timeline.cases[key],
      //recovered: tx.recovered[key]
    })
  })

  return arr
}


const getIndiaStats = async () => {
  return await Axios.get('https://api.covid19india.org/data.json').then((r)=>r.data)
}


const gethistoricalAll = async () => {
  const data = await Axios.get('https://corona.lmao.ninja/v2/historical/all').then((r)=>r.data);

  function getData(obj) {
    const newArr = [];
    var key = Object.keys(obj);
    for(let i = 0; i < key.length; i++){
      let val;
      if(key[i+1] !== undefined){
        val = obj[key[i+1]] - obj[key[i]]
      }
      newArr.push({
        date: key[i],
        value: val
      })
    }
    return newArr
  }

  return {
    cases: getData(data.cases),
    recovered: getData(data.recovered),
    deaths: getData(data.deaths)
  }
}


export {
  getDetailedStats,
  getTotalStats,
  historicalData,
  getHistoricalDataContry,
  getIndiaStats,
  getZones,
  gethistoricalAll
}