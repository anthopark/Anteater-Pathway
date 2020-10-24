import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import './css/App.css';
import PanelGroup from 'react-panelgroup';
import styled from 'styled-components';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`;

const panelConfig = [
    { size: 300, minSize: 0, maxSize: 300, resize: "dynamic" },
    { resize: "stretch" }
]

class App extends Component {

    onDragEnd = () => {

    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Container>
                    <div className="header">
                        <h1>Nav Bar</h1>
                    </div>


                    <div className="main">


                        <PanelGroup panelWidths={panelConfig} borderColor="#EEEEEE" spacing={5}>
                            <SidePanel />
                            <MainPanel />
                        </PanelGroup>


                    </div>

                </Container>
            </DragDropContext>

        );
    }
}

export default App;