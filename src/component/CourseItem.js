import React, { Component } from 'react';

import styled from 'styled-components';
import './css/CourseItem.css';

const Container = styled.div`
    width: 100%;
    margin: 10px 0;
`;

class CourseItem extends Component {
    render() {
        return (
            <Container>
                <div className="course-item">
                    <div className="course-header">
                        <div className="course-num">{`${this.props.dept} ${this.props.num}`}</div>
                        <div className="course-unit">{`${this.props.unit} Unit`}</div>
                    </div>
                    <div className="course-title-box">
                        <div className="course-title">{this.props.title}</div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default CourseItem;
