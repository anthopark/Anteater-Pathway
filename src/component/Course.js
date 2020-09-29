import React from 'react';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';

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

const DescriptionCard = styled.div`
    border: 1px solid
`;

const hoverOption = { followCursor: true, shiftX: 20, shiftY: 0 }

class Course extends React.Component {

    state = { isMouseDown: false }
    render() {
        return (
            <Popup
                content={`${this.props.unit} units`}
                header={`${this.props.title}`}
                trigger={
                    <Container>
                        <CourseItem>
                            <Dept>{this.props.dept}</Dept>
                            <Num>{this.props.num}</Num>
                        </CourseItem>
                    </Container>
                }
                eventsEnabled={false}
                basic
            />
        );
    }
}

export default Course;




