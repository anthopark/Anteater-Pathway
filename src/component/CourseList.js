import React, { Component } from 'react';

import styled from 'styled-components';
import CourseItem from './CourseItem';

const Container = styled.div`
    height: 100%;
    padding: 5px 15px;
`;

const ListControlBox = styled.div`
`;

const ItemListBox = styled.div`

    overflow-y: auto;
    max-height: 550px;
`;

class CourseList extends Component {
    render() {
        return (
            <Container>
                <ListControlBox>
                
                </ListControlBox>
                <ItemListBox>
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
                </ItemListBox>
            </Container>
        );
    }
}

export default CourseList;
