import React, { Component } from 'react';

import styled from 'styled-components';
import CourseItem from './CourseItem';

const Container = styled.div`
    padding: 20px 10px;
    height: 100%;
    overflow-y: auto;
`;

class CourseList extends Component {
    render() {
        return (
            <Container>
                {this.props.courses.map((course, index) => (
                    <CourseItem 
                        key={course._id}
                        index={index}
                        dept={course.dept}
                        num={course.num}
                        title={course.title}
                        unit={course.unit}
                        desc={course.desc}
                    />
                ))}
            </Container>
        );
    }
}

export default CourseList;
