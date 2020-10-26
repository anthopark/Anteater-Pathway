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

const sortSchoolYears = (schoolYears) => {
    return schoolYears.sort((prev, next) => {
        const prevYear = parseInt(prev.year.split('/')[0])
        const nextYear = parseInt(next.year.split('/')[1])
        if (prevYear < nextYear) return -1;
        if (prevYear > nextYear) return 1;
        else return 0
    })
}

const sortAddYearOptions = (options) => {
    return options.sort((prev, next) => {
        const prevYear = parseInt(prev.value.split('/')[0])
        const nextYear = parseInt(next.value.split('/')[1])
        if (prevYear < nextYear) return -1;
        if (prevYear > nextYear) return 1;
        else return 0
    })
}

const generateSchoolYear = (startYear, endYear) => {
    return Array(endYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx}/${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}


class App extends Component {

    state = {
        // data for user degree plan
        planData: [],

        // data representing each droppable column
        dndData: {
            'search-result': []
        },

        // options for add year drop down selections
        addYearOptions: generateSchoolYear(15, 30),

    }

    onDragEnd = (result) => {

    }

    // gets called when search button is called
    // 
    updateSearchResult = (courses) => {

        const newState = {
            ...this.state
        };

        newState.dndData['search-result'] = courses;
        this.setState(newState);

        console.log(this.state);
    }

    //
    addSchoolYear = (year, fCourses, wCourses, spCourses, suCourses) => {
        // fCourses: array containing courses for fall quarter
        let newState = {
            ...this.state
        };

        // 'planData' and 'dndData' will share the same course array for data consistency. 
        const faCourses = fCourses ? fCourses : []
        const wiCourses = wCourses ? wCourses : []
        const sprCourses = spCourses ? spCourses : []
        const sumCourses = suCourses ? suCourses : []

        newState.planData.push({
            year: year,
            terms: [
                faCourses,
                wiCourses,
                sprCourses,
                sumCourses,
            ]
        });

        // creating the droppable columns
        newState.dndData[year + 'f'] = faCourses;
        newState.dndData[year + 'w'] = wiCourses;
        newState.dndData[year + 'sp'] = sprCourses;
        newState.dndData[year + 'su'] = sumCourses;


        sortSchoolYears(newState.planData);
        newState.addYearOptions = newState.addYearOptions.filter(option => option.value !== year);

        this.setState(newState);
    }

    removeSchoolYear = (year) => {
        const newState = {
            ...this.state
        };

        newState.planData = newState.planData.filter(plan => plan.year !== year);
        
        newState.addYearOptions.push({
            label: year, value: year
        });

        sortAddYearOptions(newState.addYearOptions);

        // delete corresponding dnd column data
        delete newState.dndData[year+'f'];
        delete newState.dndData[year+'w'];
        delete newState.dndData[year+'sp'];
        delete newState.dndData[year+'su'];

        this.setState(newState);
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
                                addSchoolYear={this.addSchoolYear}
                                removeSchoolYear={this.removeSchoolYear}
                            />
                        </PanelGroup>
                    </div>
                </DragDropContext>
            </Container>

        );
    }
}

export default App;