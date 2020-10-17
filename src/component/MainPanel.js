import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';
import PlannerPane from './PlannerPane';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

class MainPanel extends Component {
    render() {
        return (
            <Container>
                <PlannerControls />
                <PlannerPane />
            </Container>
        );
    }
}

export default MainPanel;
