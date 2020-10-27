import React, { Component } from 'react';

import './css/SchoolYear.css';
import styled from 'styled-components';
import SingleQuarter from './SingleQuarter';

const Container = styled.div`
    min-width: 100rem;
    margin-bottom: 1rem;
`;

class SchoolYear extends Component {


    onTrashClick = () => {
        this.props.removeSchoolYear(this.props.year)
    }

    render() {
        return (
            <Container>
                <div className="year-info-box">
                    <span className="year-main-text">
                        {`${this.props.year.split('/')[0]}-${this.props.year.split('/')[1]}`} Academic Year
                    </span>
                    <div className="trash-icon-box">
                        <a href="#" className="trash-icon-link" onClick={this.onTrashClick}><i className="fas fa-trash-alt fa-lg"></i></a>
                    </div>
                </div>
                <div className="quarter-list-box">

                    <SingleQuarter
                        drpblId={this.props.year + 'f'}
                        header={`Fall 20${this.props.year.split('/')[0]}`}
                        courses={this.props.terms[0]}
                    />
                    <SingleQuarter
                        drpblId={this.props.year + 'w'}
                        header={`Winter 20${this.props.year.split('/')[1]}`}
                        courses={this.props.terms[1]}
                    />
                    <SingleQuarter
                        drpblId={this.props.year + 'sp'}
                        header={`Spring 20${this.props.year.split('/')[1]}`}
                        courses={this.props.terms[2]}
                    />
                    <SingleQuarter
                        drpblId={this.props.year + 'su'}
                        header={`Summer 20${this.props.year.split('/')[1]}`}
                        courses={this.props.terms[3]}
                    />
                </div>

            </Container>
        );
    }
}

export default SchoolYear;
