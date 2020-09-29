import React from "react";
import {
    Segment,
} from 'semantic-ui-react';
import PlannerControl from './PlannerControl'

import './css/MainPanel.css'

export default class MainPanel extends React.Component {
    render() {
        return (
            <div className="main-panel-div">
                <PlannerControl />
                <Segment>
                    <h1>Main Panel</h1>
                </Segment>
            </div>
        );
    }
}