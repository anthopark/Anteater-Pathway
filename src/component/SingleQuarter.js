import React, { Component } from 'react';
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

    })

    return result;

}
class SingleQuarter extends Component {

    state = { totalUnit: 0, courseItems: [] };

    componentDidMount = () => {
        this.setState({
            courseItems: this.props.courses
        })
    }

    render() {
        return (
            <Container>
                <div className="quarter-header">
                    {this.props.header}
                </div>
                <div className="quarter-course-list">
                    {this.state.courseItems.map((course) => {
                        return (
                            <div className="course-item-box">
                                <CourseItem
                                    key={course.id}
                                    dept={course.dept}
                                    num={course.num}
                                    title={course.title}
                                    unit={course.unit}
                                />
                            </div>
                        );
                    })
                    }
                </div>
                <div className="total-unit-box">
                    Unit: {this.state.totalUnit}
                </div>
            </Container>
        );
    }
}

export default SingleQuarter;
