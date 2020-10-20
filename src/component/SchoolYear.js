import React, { Component } from 'react';

import './css/SchoolYear.css';
import styled from 'styled-components';
import SingleQuarter from './SingleQuarter';

const Container = styled.div`
    border: .3rem solid #000;
    min-width: 100rem;
`;

class SchoolYear extends Component {
    render() {
        return (
            <Container>
                <div className="year-info-box">
                    <span className="year-main-text">
                        {`${this.props.year.split('/')[0]}-${this.props.year.split('/')[1]}`} Academic Year</span>
                </div>
                <div className="quarter-list-box">
                    <SingleQuarter
                        term={`Fall 20${this.props.year.split('/')[0]}`}
                    />
                    <SingleQuarter
                        term={`Winter 20${this.props.year.split('/')[1]}`}
                    />
                    <SingleQuarter
                        term={`Spring 20${this.props.year.split('/')[1]}`}
                    />
                    <SingleQuarter
                        term={`Summer 20${this.props.year.split('/')[1]}`}
                    />
                </div>

            </Container>
        );
    }
}

export default SchoolYear;
