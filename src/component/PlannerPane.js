import React, { Component } from 'react';

import styled from 'styled-components';
import SchoolYear from './SchoolYear';

const Container = styled.div`
    flex: 1 1 auto;
    padding: 2rem 2rem;
`;

class PlannerPane extends Component {

    render() {
        return (
            <Container>
                <div className="year-list-box">
                    {this.props.appData.planData.map( 
                        ({year, terms}) => (<SchoolYear year={year} terms={terms} removeSchoolYear={this.props.removeSchoolYear} />))
                    }
                </div>
            </Container>
        );
    }
}

export default PlannerPane;
