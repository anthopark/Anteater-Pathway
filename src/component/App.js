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

    state = {
        'search-result': {
            id: 'search-result', // droppable id
            courses: []
        }
    }

    onDragEnd = (result) => {

    }

    updateSearchResult = (courses) => {
        this.setState({
            'search-result': {
                ...this.state['search-result'],
                courses: courses,
            }
        })
        console.log(this.state['search-result'].courses);
    }

    addSchoolYearTerms = (termId, plannedCourses) => {

    }

    render() {
        return (

            <Container>
                <div className="header">
                    <h1>Nav Bar</h1>
                </div>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <div className="main">
                        <PanelGroup panelWidths={panelConfig} borderColor="#EEEEEE" spacing={5}>
                            <SidePanel
                                appData={this.state}
                                updateSearchResult={this.updateSearchResult}
                            />
                            <MainPanel
                                appData={this.state}
                            />
                        </PanelGroup>
                    </div>
                </DragDropContext>
            </Container>

        );
    }
}

export default App;