import React from "react";
import MainPanel from "./MainPanel";
import BrowsePanel from "./BrowsePanel";
import PanelGroup from "react-panelgroup";

export default class App extends React.Component {


    render() {
        return (
            <div>
                <PanelGroup borderColor="grey">
                    <MainPanel />  
                    <BrowsePanel />
                </PanelGroup>
            </div>
        );
    }
}