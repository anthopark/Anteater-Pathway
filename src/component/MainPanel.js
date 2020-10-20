import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';
import PlannerPane from './PlannerPane';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

class MainPanel extends Component {

    state = {
        schoolYears: []
    }

    createSchoolYear = (year) => {
        let schoolYears = this.state.schoolYears;
        schoolYears.push({
            year,
            terms: []
        })
        this.setState({
            schoolYears: schoolYears,
        })
    }

    render() {
        return (
            <Container>
                <PlannerControls
                    createSchoolYear={this.createSchoolYear}
                />
                <PlannerPane 
                    schoolYears={this.state.schoolYears}
                />
            </Container>
        );
    }
}

export default MainPanel;
