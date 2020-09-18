import 'semantic-ui-css/semantic.min.css'

import React from "react";
import MainPanel from "./MainPanel";
import LeftPanel from "./LeftPanel";
import PanelGroup from "react-panelgroup";



export default class App extends React.Component {


    render() {
        return (
            <div>
                <PanelGroup borderColor="grey">
                    <MainPanel />
                    <LeftPanel />
                </PanelGroup>
            </div>
        );
    }
}