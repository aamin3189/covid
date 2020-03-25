import Axios from 'axios';
import _ from 'underscore';

const getDetailedStats = () => {
    let totalStats = {
      cases: 0,
      newCases: 0,
      deaths: 0,
      newDeaths: 0,
      recovered: 0,
      active: 0,
      critical: 0
    };
    Axios.get(`${conf.api}/countries`).then(resp => {
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
  };

  const getTotalStats = () => {
    Axios.get(`${conf.api}/all`).then(resp => {
      const apiData = resp.data;
      //format data
      let stats = [
        {
          name: "Deaths",
          value: apiData.deaths,
          color: "#C31111"
        },
        {
          name: "Recovered",
          value: apiData.recovered,
          color: "#3B830D"
        },
        {
          name: "Active Case",
          value: apiData.cases - apiData.deaths - apiData.recovered,
          color: "#EB9B1B"
        }
      ];
      return {
        stats: stats,
        total: apiData.cases
      }
    });
  };

  export {
    getDetailedStats,
    getTotalStats
  }