import React from "react";
import { Tab } from "semantic-ui-react";

import './css/CourseFindPane.css'
import BrowseControls from './BrowseControls';

const panes = [
    {
        menuItem: 'Browse',
        render: () => <Tab.Pane attached={false}><BrowseControls /></Tab.Pane>
    },
    {
        menuItem: 'Search',
        render: () => <Tab.Pane attached={false}>Search Content</Tab.Pane>
    },
]


export default class CourseFindPane extends React.Component {
    render() {
        return (
            <div className="course-find-pane">
                <Tab menu={ {secondary: true, pointing: true} } panes={panes} />
            </div>
        );
    }
}