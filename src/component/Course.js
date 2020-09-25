import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 120px;
    margin: 5px;
`;

const CourseItem = styled.div`
    padding: 3px;
    height: 40px;
    border: 1px solid lightblue;
    border-radius: 5px;

    display: flex;
`;

const Dept = styled.div`
    margin: auto;
`;

const Num = styled.div`
    margin: auto;
`;

class Course extends React.Component {
    render() {
        return (
            <Container>
                <CourseItem>
                    <Dept>{this.props.dept}</Dept>
                    <Num>{this.props.num}</Num>
                </CourseItem>

            </Container>
        );
    }
}

export default Course;