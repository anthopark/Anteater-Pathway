import 'semantic-ui-css/semantic.min.css'

import React from "react";
import MainPanel from "./MainPanel";
import LeftPanel from "./LeftPanel";
import PanelGroup from "react-panelgroup";

const panelConfig = [
    {resize: "stretch"},
    {size: 400, minSize: 0, maxSize: 700, resize: "dynamic", snap: [300]}
]

export default class App extends React.Component {

    render() {
        return (
            <div>
                <PanelGroup panelWidths={panelConfig} borderColor="#EEEEEE" spacing={5}>
                    <MainPanel />
                    <LeftPanel />
                </PanelGroup>
            </div>
        );
    }
}