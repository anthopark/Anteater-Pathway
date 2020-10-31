import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';
import PlannerPane from './PlannerPane';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;


class MainPanel extends Component {

    componentDidMount() {

        // creating a default academic year
        const defaultYear = '20/21'
        this.props.addSchoolYear(defaultYear);
    }

    render() {
        return (
            <Container>
                <PlannerControls
                    createSchoolYear={this.props.addSchoolYear}
                    yearDropDownOptions={this.props.appData.addYearOptions}
                />
                <PlannerPane
                    appData={this.props.appData}
                    removeSchoolYear={this.props.removeSchoolYear}
                    removeCourse={this.props.removeCourse}
                />
            </Container>
        );
    }
}

export default MainPanel;
