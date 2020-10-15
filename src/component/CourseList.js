import React, { Component } from 'react';

import './css/CourseList.css'
import styled from 'styled-components';
import CourseItem from './CourseItem';

const Container = styled.div`
`;

class CourseList extends Component {
    render() {
        return (
            <Container>
                <div className="course-list">
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
                </div>
            </Container >
        );
    }
}

export default CourseList;
