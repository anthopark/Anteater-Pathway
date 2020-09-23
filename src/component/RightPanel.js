import React from "react";

import CourseFindPane from "./CourseFindPane"
import CourseListPane from "./CourseListPane"
import courseApi from '../api/course-api';
import './css/RightPanel.css';


const fetchCourses = async (apiURL, param1, param2) => {
    let params = null;
    params = apiURL.includes('browse') ?
        { dept: param1, level: param2 } : { dept: param1, num: param2 };

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



export default class RightPanel extends React.Component {

    state = { courses: [] }

    onBrowseSubmit = async (deptValue, levelValue) => {
        console.log(deptValue, levelValue)
        const courses = await fetchCourses('/browse', deptValue, levelValue);

        this.setState({
            courses: courses
        })

        console.log(courses);
    }

    onSearchSubmit = async (deptValue, numValue) => {
        console.log(deptValue, numValue)
        const courses = await fetchCourses('/search', deptValue, numValue);

        this.setState({
            courses: courses
        })

        console.log(courses);
    }


    render() {
        return (
            <div className="left-panel">
                <CourseFindPane
                    onBrowseSubmit={this.onBrowseSubmit}
                    onSearchSubmit={this.onSearchSubmit}
                />
                <CourseListPane
                    courses={this.state.courses}
                />
            </div>
        );
    }
}