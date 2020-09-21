import React from "react";

import CourseFindPane from "./CourseFindPane"
import CourseListPane from "./CourseListPane"

import './css/RightPanel.css';


export default class RightPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <CourseFindPane />
                <CourseListPane />
            </div>
        );
    }
}