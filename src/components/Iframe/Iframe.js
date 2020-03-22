import React from 'react';
import styled from 'styled-components';

const Frame = styled.iframe`
border: none;
min-height: 400px;
width: 100%;
margin-bottom:30px;
`

function Iframe(props) {
    return (
        <div>
            <Frame src={props.src} />
        </div>
    );
}

export default Iframe;