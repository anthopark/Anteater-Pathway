import React, { Component } from 'react';

import styled from 'styled-components';
import SearchForm from './SearchForm';
import courseApi from '../api/course-api';

const Container = styled.div`
    width: 100%;

`;

const SearchFormBox = styled.div`

`;

const SearchResultBox = styled.div`

`;

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

// const fetchCourses = async (apiURL, param1, param2) => {
//     let params = null;
//     params = apiURL.includes('browse') ?
//         { dept: param1, level: param2 } : { dept: param1, num: param2 };

//     let response = []
//     try {
//         response = await courseApi.get(apiURL, {
//             params
//         })
//     } catch (e) {
//         console.log(e.toString());
//         return [];
//     }

//     return response.data;
// }

class SidePanel extends Component {

    state = {
        deptOptions: [],
        levelOptions: [],
        courses: [],
    }

    onCourseSearch = async () => {

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
                </SearchResultBox>
            </Container>
        );
    }
}

export default SidePanel;
