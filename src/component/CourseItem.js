import React, { Component } from 'react';
import styled from 'styled-components';
import './css/CourseItem.css';

const Container = styled.div`
    width: 100%;

`;


class CourseItem extends Component {

    state = {
        isHovered: false,
    }



    render() {
        let trashIcon;
        if (this.props.isPlanned && this.state.isHovered) {
            trashIcon = (
                <div className="course-trash-icon-box">
                    <a href="#" className="trash-icon-link" onClick={() => console.log('delete course!')}><i className="fas fa-trash-alt fa-sm"></i></a>
                </div>
            );
        }


        return (
            <Container
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <div className="course-item">
                    <div className="course-header">
                        <div className="course-num">{`${this.props.dept} ${this.props.num}`}</div>
                        <div className="course-unit">{`${this.props.unit} Unit`}{ trashIcon }</div>
                    </div>
                    <div className="course-title-box">
                        <div className="course-title">{this.props.title}</div>
                    </div>
                </div>
            </Container>
        )
    }

}


export default CourseItem;
