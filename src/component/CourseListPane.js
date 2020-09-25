import React from "react";
import styled from "styled-components";

import { Segment } from 'semantic-ui-react';
import Course from "./Course"

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 10px;
    display: flex;
    flex-flow: column nowrap;
`;

const CourseList = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
    max-height: 420px;
`;


export default class CourseListPane extends React.Component {
    render() {
        return (
            <Container>
                <Segment>
                    <CourseList>
                        {this.props.courses.map((course, index) => (
                            <Course
                                key={course._id}
                                index={index}
                                dept={course.dept}
                                num={course.num}
                                unit={course.unit}
                            />
                        ))}
                    </CourseList>
                </Segment>
            </Container>
        );
    }
}