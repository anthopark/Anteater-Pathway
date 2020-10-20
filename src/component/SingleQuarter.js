import React, { Component } from 'react';

import './css/SingleQuarter.css';
import styled from 'styled-components';

const Container = styled.div`
    width: 28rem;
    padding: 0 .7rem;
    border: .1rem solid #bbb;
    border-radius: 1rem;
    margin-right: 1rem;
    
`;

class SingleQuarter extends Component {

    state = { totalUnit: 0 };

    render() {
        return (
            <Container>
                <div className="quarter-header">
                    {this.props.term}
                </div>
                <div className="quarter-course-list">
                </div>
                <div className="total-unit-box">
                    Unit: {this.state.totalUnit}
                </div>
            </Container>
        );
    }
}

export default SingleQuarter;
