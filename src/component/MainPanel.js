import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';
import PlannerPane from './PlannerPane';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const sortSchoolYears = (schoolYears) => {
    return schoolYears.sort((prev, next) => {
        const prevYear = parseInt(prev.year.split('/')[0])
        const nextYear = parseInt(next.year.split('/')[1])
        if (prevYear < nextYear) return -1;
        if (prevYear > nextYear) return 1;
        else return 0
    })
}

class MainPanel extends Component {

    state = {
        schoolYears: []
    }
    

    createSchoolYear = (year) => {

        let schoolYears = this.state.schoolYears;
        schoolYears.push({
            year,
            terms: [
                [], [], [], []
            ]
        })

        sortSchoolYears(schoolYears);

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
