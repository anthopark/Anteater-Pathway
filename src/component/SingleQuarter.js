import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import CourseItem from './CourseItem';
import './css/SingleQuarter.css';
import styled from 'styled-components';

const Container = styled.div`
    width: 30.3rem;
    border: .1rem solid #bbb;
    border-radius: 1rem;
    margin-right: 1rem;
    padding: 0 .7rem;
`;

const computeTotalUnit = (courses) => {
    let result = 0;

    courses.forEach((course) => {
        result += parseInt(course.unit);
    })

    return result;

}
class SingleQuarter extends Component {



    render() {
        return (
            <Container>
                <div className="quarter-header">
                    {this.props.header}
                </div>

                <Droppable droppableId={this.props.drpblId}>
                    {(provided) => (
                        <div
                            className="quarter-course-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.courses.map((course, index) =>
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
                                                key={course.id}
                                                dept={course.dept}
                                                num={course.num}
                                                title={course.title}
                                                unit={course.unit}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>


                <div className="total-unit-box">
                    Unit: {computeTotalUnit(this.props.courses)}
                </div>
            </Container>
        );
    }
}

export default SingleQuarter;
