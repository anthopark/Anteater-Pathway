import React, { Component } from 'react';

import './css/SingleQuarter.css';
import styled from 'styled-components';

const Container = styled.div`
    width: 28rem;
    border: .2rem solid #bbb;
    border-radius: 1rem;
    margin-right: 1rem;
`;

class SingleQuarter extends Component {
    render() {
        return (
            <Container>
                <div className="quarter-header">
                    {this.props.term}
                </div>
                <div className="quarter-course-list">
                </div>
            </Container>
        );
    }
}

export default SingleQuarter;
