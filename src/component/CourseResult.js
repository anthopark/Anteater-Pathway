import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


import styled from 'styled-components';
import CourseItem from './CourseItem';
import './css/CourseList.css'
// import CourseList from './CourseList';

const Container = styled.div`

`;


class CourseResult extends Component {
    render() {
        return (
            <Container>
                <Droppable droppableId="search-result">
                    {(provided) => (
                        <div
                            className="course-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.courses.map((course, index) => (
                                <Draggable
                                    key={course._id}
                                    draggableId={course._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <CourseItem
                                                id={course._id}
                                                dept={course.dept}
                                                num={course.num}
                                                title={course.title}
                                                unit={course.unit}
                                                desc={course.desc}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </ Container >
        );
    }
}

export default CourseResult;
