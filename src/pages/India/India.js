import React from 'react';
import '../Countries/countries.scss';
import {Link} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import Iframe from '../../components/Iframe/Iframe';

function India(props) {
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
                            <div className="sort">
                                {/* Filter
                                <Icon size="md" type="check" /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="iframes" style={{marginTop: '47px'}}>
                    <Iframe src="https://public.flourish.studio/visualisation/1568994/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1535461/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1569043/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1549615/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1577722/embed" />
                    <Iframe src="https://public.flourish.studio/visualisation/1577945/embed" />

                </div>
            </div>
    );
}

export default India;