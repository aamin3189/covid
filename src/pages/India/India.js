import React from 'react';
import '../Countries/countries.scss';
import {Link} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import Iframe from '../../components/Iframe/Iframe';

function India(props) {
    return (
        <div className="countries">
                <p style={{marginTop: '60px',marginLeft:'10px'}}>

                        The visualisation reports are from &nbsp;
                        <a target="_blank" href="https://www.indiatoday.in/india/story/coronavirus-cases-in-india-covid19-states-cities-affected-1653852-2020-03-09">India Today</a>
                        &nbsp; .This website/app is does not own the data
                </p>
                <div className="controls">
                    <div className="search-control">
                        <div className="top-controls">

                                <Link to="/" className="back">
                                    <Icon 
                                    size="md" type="left"/>
                                    Dashboard
                                </Link>
                            <div className="sort">
                                {/* Filter
                                <Icon size="md" type="check" /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="iframes">
                    <Iframe height={1000} src="https://public.flourish.studio/visualisation/1535461/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1568994/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1569043/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1549615/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1577722/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1577945/embed" />

                </div>
            </div>
    );
}

export default India;