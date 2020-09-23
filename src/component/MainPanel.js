import React from "react";

import {
    Segment,
} from 'semantic-ui-react';
import './css/MainPanel.css'

export default class MainPanel extends React.Component {
    render() {
        return (
            <div className="main-panel-div">
                <Segment>
                    <h1>Main Panel</h1>
                </Segment>
            </div>
        );
    }
}