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
                    World data powered by <a href="https://github.com/NovelCOVID/API">NovelCOVID/API</a>
                    <br/><br/>
                    India data powered by <a href="https://github.com/NovelCOVID/API">CovidIndia API</a>
                </div>
                
            </Credit>
        </div>
    );
}

export default Credits;