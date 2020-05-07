import React from 'react';
import styled from 'styled-components';
import {SearchBar} from 'antd-mobile';

const Container = styled.div`
    height: 100vh;
    width:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background: #FFF;
`

function SeacrhLocation(props) {
    return (
        <Container className="search-modal">
            <div style={{padding:'5px'}}>
                <a style={{display: 'inline-block'}}>Seacrh Location</a>
                <i style={{float:'right'}} className="fa fa-close"></i>
            </div>
            <SearchBar placeholder="Seacrh District" cancelText="Clear"  />
        </Container>
    );
}

export default SeacrhLocation;