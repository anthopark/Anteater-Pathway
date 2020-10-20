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
                    <SchoolYear
                        year={'20/21'}
                        terms={null}
                    />
                    {this.props.schoolYears.map( 
                        ({year, terms}) => (<SchoolYear year={year} terms={terms} />))
                    }
                </div>
            </Container>
        );
    }
}

export default PlannerPane;
