import React, { Component } from 'react';

import './css/CourseList.css'
import styled from 'styled-components';
import CourseItem from './CourseItem';

const Container = styled.div`
    padding: 0 1.5rem;
`;

const ListControlBox = styled.div`
`;

const ItemListBox = styled.div`
    overflow-y: auto;
    max-height: 45rem;
`;

const ItemList = styled.div`

`;

class CourseList extends Component {
    render() {
        return (
            <Container>
                <div className="control-box">

                </div>
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
