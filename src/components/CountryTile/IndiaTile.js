import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import indianFlag from './indianFlag.png';
import { numberWithCommas } from '../../pages/Countries/Country';
import UpArrow from '../UpArrow/UpArrow';

const Inc = styled.div`
    text-align:center;
    display: grid;
    /* grid-template-rows: 1fr 1fr 1fr; */
    grid-gap: 10px;
    a{
        color: #EB5569;
    }
`
const Head = styled.div`
    /* float:left */
`
const Circle = styled.div`
    background: #ddd;
    height:12px;
    width:12px;
    border-radius:6px;
    margin-right:8px;
    margin-left:10px;
    margin-top:3px;
    float:left;
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
`
const Stat = styled.div`
    .num{
        color: ${props => props.color || "#000"};
        font-size:14px;
        font-weight:400;
        .primary{
            display:block;
        }
        small{
            /* color: #FFF;
            background-color: ${props => props.color || "#000"};
            border-radius:10px;
            text-align:center;
            padding-right:5px;
            font-size:12px; */
        }
    }
    .case{
        color:#7c7c7c;
        font-size:10px
    }
`


class IndiaTile extends Component {

    state = {
        data: null
    }
    componentDidMount(){
        const data = this.props.data;
        this.setState({
            data: data
        })
    }

    render() {
        const data = this.state.data
        return (
            <>
                {
                    this.state.data &&
                    <Inc onClick={()=>this.props.history.push("/india")}>
                        <Head>
                            <img style={{height:12,marginRight:5}} src={indianFlag} alt="Country" />
                            INDIA
                            {/* <Circle />
                            <Case>
                                +12
                            </Case> */}
                        </Head>

                        <Grid>
                            <Stat color="#EB9B25">
                                <div className="num">
                                        {
                                            numberWithCommas(data.statewise[0].confirmed)
                                        } 
                                        <br/>
                                        { data.statewise[0].deltaconfirmed > 0 &&
                                            <small>
                                                <UpArrow size={10} color="#EB9B25" />
                                                {numberWithCommas(data.statewise[0].deltaconfirmed)}
                                            </small>
                                        }
                                </div>
                                <div className="case"> Cases</div>
                            </Stat>

                            <Stat color="#3B8313">
                                <div className="num">
                                        {numberWithCommas(data.statewise[0].recovered)}
                                        <br/>
                                        {data.statewise[0].deltarecovered > 0 &&
                                            <small>
                                               <UpArrow size={10} color="#3B8313" />{numberWithCommas(data.statewise[0].deltarecovered)}
                                            </small>
                                        }
                                    </div>
                                <div className="case">Recovered</div>
                            </Stat>
                            <Stat color="#C31112">
                                <div className="num">{numberWithCommas(data.statewise[0].deaths)} 
                                    <br/>
                                    { data.statewise[0].deltadeaths > 0 &&
                                        <small>
                                            <UpArrow size={10} color="#C31112" />{numberWithCommas(data.statewise[0].deltadeaths)}
                                        </small>
                                    }
                                </div>
                                <div className="case">Death</div>
                            </Stat>
                        </Grid>

                        <Link to="/india">
                            View Details <i className="fa fa-chevron-right" />
                        </Link>
                    </Inc>
                }
            </>
        );
    }
}

IndiaTile.propTypes = {
    data: PropTypes.object
};

export default IndiaTile;