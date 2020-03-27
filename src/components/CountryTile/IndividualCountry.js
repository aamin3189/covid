import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import conf from '../../config/config';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Inc = styled.div`
    text-align:center;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 22px;
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
        font-weight:400
    }
    .case{
        color:#7c7c7c;
        font-size:10px
    }
`


class IndividualCountry extends PureComponent {

    state = {
        data: null
    }
    async componentDidMount(){
        if(this.props.countryName){
            const data = await axios.get(conf.api+"/countries/"+this.props.countryName).then((r)=>r.data)
            this.setState({
                data: data
            })
        } else {
            this.setState({
                data: this.props.countryObj
            })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.data &&
                    <Inc onClick={()=>this.props.history.push("/country/india")}>
                        <Head>
                            <img style={{height:12,marginRight:5}} src={this.state.data.countryInfo.flag} alt="Country" />
                            {this.state.data.country.toUpperCase()}
                            {/* <Circle />
                            <Case>
                                +12
                            </Case> */}
                        </Head>

                        <Grid>
                            <Stat color="#EB9B25">
                            <div className="num">
                                {this.state.data.cases} 
                                <small>
                                +{this.state.data.todayCases}
                                </small>
                            </div>
                                <div className="case">Cases</div>
                            </Stat>
                            <Stat color="#3B8313">
                                <div className="num">
                                        {this.state.data.recovered}
                                       
                                    </div>
                                <div className="case">Recovered</div>
                            </Stat>
                            <Stat color="#C31112">
                                <div className="num">{this.state.data.deaths} <small>
                                        +{this.state.data.todayDeaths}
                                        </small></div>
                                <div className="case">Death</div>
                            </Stat>
                        </Grid>

                        <Link to="/india">
                            View Details
                        </Link>
                    </Inc>
                }
            </>
        );
    }
}

IndividualCountry.propTypes = {
    countryName: PropTypes.string.isRequired
};

export default IndividualCountry;