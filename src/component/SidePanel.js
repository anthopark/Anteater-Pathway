import React, { Component } from 'react';

import './css/SidePanel.css';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import CourseList from './CourseList';
import courseApi from '../api/course-api';


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
`;

const SearchFormBox = styled.div`
    flex: 0 1 auto;
`;

const SearchResultBox = styled.div`
    flex: 1 1 auto;
`;

const ResultInfoBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;


// school department options to show on the dropdown select
const fetchAllDeptOptions = async () => {
    let response = []
    try {
        response = await courseApi.get('/course/dept/all');
    } catch (e) {
        console.log(e.toString());

        // return dummy data
        return [
            { label: 'COMPSCI', value: 'COMPSCI' },
            { label: 'IN4MATX', value: 'IN4MATX' },
        ]
    }

    return response.data.map((dept, i) => {
        return { label: dept, value: dept, };
    });
}


// search course by school department, course level, and/or course number
const fetchCourses = async (apiURL, dept, level, num) => {
    let params = {
        dept,
        level,
        num,
    }

    let response = []
    try {
        response = await courseApi.get(apiURL, {
            params
        })
    } catch (e) {
        console.log(e.toString());
        return [];
    }

    return response.data;
}


class SidePanel extends Component {

    state = {
        deptOptions: [],
        levelOptions: [],
        courses: [],
        isSearched: false,
        isLoading: false,
    }

    onCourseSearch = async (dept, level, num) => {
        console.log(dept, level, num);

        this.setState({
            isLoading: true,
        })

        const courses = await fetchCourses('/course/search', dept, level, num);

        setTimeout(() => {
            this.setState({
                courses: courses,
                isSearched: true,
                isLoading: false,
            })
        }, 400)

        console.log(courses);
    }

    async componentDidMount() {
        // API calls to retrieve dropdown items for departments
        const result = await fetchAllDeptOptions();
        this.setState({
            deptOptions: result,
            levelOptions: [
                { label: 'Lower Division', value: 'Lower Division' },
                { label: 'Upper Division', value: 'Upper Division' },
                { label: 'Undergraduate', value: 'Undergraduate' },
                { label: 'Graduate', value: 'Graduate' },
                { label: 'Other', value: 'Other' },
            ],
        })
    }

    render() {
        let resultContent = undefined;
        if (this.state.isLoading) {
            // loading display
            resultContent = (
                <ResultInfoBox>
                    <div className="result-msg">
                        <div className="icon-box">
                            <i class="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                    </div>
                </ResultInfoBox>
            );
        } else if (!this.state.isSearched) {
            // initial display
            resultContent = (
                <ResultInfoBox>
                    <div className="result-msg">
                        <div className="icon-box">
                            <i class="fas fa-search fa-2x"></i>
                        </div>
                        Find your courses!
                    </div>
                </ResultInfoBox>
            );
        } else if (this.state.isSearched && this.state.courses.length === 0) {
            // searched but no result back
            resultContent = (
                <ResultInfoBox>
                    <div className="result-msg">
                        <div className="icon-box">
                            <i class="fas fa-exclamation fa-2x"></i>
                        </div>
                        No courses found!
                    </div>
                </ResultInfoBox>
            );
        } else {
            resultContent = (
                <CourseList
                    courses={this.state.courses}
                />
            );
        }

        return (
            <Container>
                <SearchFormBox>
                    <SearchForm
                        onCourseSearch={this.onCourseSearch}
                        deptOptions={this.state.deptOptions}
                        levelOptions={this.state.levelOptions}
                    />
                </SearchFormBox>

                <SearchResultBox>
                    {resultContent}
                </SearchResultBox>
            </Container>
        );
    }
}

export default SidePanel;
