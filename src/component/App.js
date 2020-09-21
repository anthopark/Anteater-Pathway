import 'semantic-ui-css/semantic.min.css'

import React from "react";
import MainPanel from "./MainPanel";
import RightPanel from "./RightPanel";
import PanelGroup from "react-panelgroup";

const panelConfig = [
    {resize: "stretch"},
    {size: 400, minSize: 0, maxSize: 700, resize: "dynamic", snap: [300]}
]

export default class App extends React.Component {

    render() {
        return (
            <div>
                <h1>Nav Bar Here</h1>
                <PanelGroup panelWidths={panelConfig} borderColor="#EEEEEE" spacing={5}>
                    <MainPanel />
                    <RightPanel />
                </PanelGroup>
            </div>
        );
    }
}