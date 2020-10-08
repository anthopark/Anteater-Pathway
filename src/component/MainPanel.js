import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';


const Container = styled.div`


`;

class MainPanel extends Component {
    render() {
        return (
            <Container>
                <PlannerControls />
            
            </Container>
        );
    }
}

export default MainPanel;
