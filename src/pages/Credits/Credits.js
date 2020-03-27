import React from 'react';
import '../Countries/countries.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';

const Credit = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;
    a{
        color: #EB5569
    }
    text-align: center;
    margin-top: 80px;
`


function Credits(props) {
    return (
        <div className="countries">
            <div className="controls">
                <div className="search-control">
                    <div className="top-controls">

                            <Link to="/" className="back">
                                <Icon 
                                size="md" type="left"/>
                                Back
                            </Link>
                    </div>
                </div>
            </div>
            <Credit>
                <div>
                    Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div>
                    <a href="https://www.freepik.com/free-photos-vectors/business">Business vector created by freepik - www.freepik.com</a>
                </div>
                <div>
                    Data by <a href="https://github.com/NovelCOVID/API">NovelCOVID/API</a>
                </div>
                {/* <div>
                    India Visualisation <a href="https://www.indiatoday.in/india/story/coronavirus-cases-in-india-covid19-states-cities-affected-1653852-2020-03-09">India Today</a>
                </div> */}
            </Credit>
        </div>
    );
}

export default Credits;