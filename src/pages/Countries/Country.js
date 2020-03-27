import React from 'react';
import './country.scss';
import { Link } from 'react-router-dom';
// const images = require.context('./flags', true);

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Country(props) {
    return (
        <div className="country-item">
        <Link to={`/country/${props.countryObj.country}`}>

             <img alt="Country" className="country-flag" src={props.countryObj.countryInfo.flag} />
             
              <div className="">
                <div className="top-line">
                    <div className="name">
                        {props.countryObj.country}
                    </div>
                    <div className="case">
                        {numberWithCommas(props.countryObj.cases)} 
                        {props.countryObj.todayCases > 0 &&
                        <span>
                            (+{numberWithCommas(props.countryObj.todayCases)})
                        </span>}
                    </div>
                </div>
                <div className="second-line">
                    <span className="active">
                        {
                            numberWithCommas(props.countryObj.active)
                        }
                    </span>
                    <span className="dead">
                        {
                            numberWithCommas(props.countryObj.deaths)
                        }
                        {
                            props.countryObj.todayDeaths > 0 &&
                            <txt> 
                                (+{numberWithCommas(props.countryObj.todayDeaths)})
                            </txt>
                        }
                    </span>   
                    <span className="recovered">
                            {
                            numberWithCommas(props.countryObj.recovered)
                        }
                    </span>
                </div>
              </div>
        </Link>
        </div>
    );
}

export default Country;