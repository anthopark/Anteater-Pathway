import React from "react";

import CourseFindPane from "./CourseFindPane"
import CourseListPane from "./CourseListPane"

import './css/LeftPanel.css';


export default class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <CourseFindPane />
                <CourseListPane />
            </div>
        );
    }
}