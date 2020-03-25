import React from 'react';
import './country.scss';
// const images = require.context('./flags', true);



function Country(props) {
    return (
        <div className="country-item">

             <img alt="Country" className="country-flag" src={props.countryObj.countryInfo.flag} />
             
              <div className="">
                <div className="top-line">
                    <div className="name">
                        {props.countryObj.country}
                    </div>
                    <div className="case">
                        {props.countryObj.cases} 
                        {props.countryObj.todayCases > 0 &&
                        <span>
                            (+{props.countryObj.todayCases})
                        </span>}
                    </div>
                </div>
                <div className="second-line">
                    <span className="active">
                        {
                            props.countryObj.active
                        }
                    </span>
                    <span className="dead">
                        {
                            props.countryObj.deaths
                        }
                        {
                            props.countryObj.todayDeaths > 0 &&
                            <txt> 
                                (+{props.countryObj.todayDeaths})
                            </txt>
                        }
                    </span>   
                    <span className="recovered">
                            {
                            props.countryObj.recovered
                        }
                    </span>
                </div>
              </div>
        </div>
    );
}

export default Country;