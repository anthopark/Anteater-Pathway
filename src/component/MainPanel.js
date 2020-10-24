import React, { Component } from 'react';
import styled from 'styled-components';

import PlannerControls from './PlannerControls';
import PlannerPane from './PlannerPane';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const generateSchoolYear = (startYear, endYear) => {
    return Array(endYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx}/${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}

const sortSchoolYears = (schoolYears) => {
    return schoolYears.sort((prev, next) => {
        const prevYear = parseInt(prev.year.split('/')[0])
        const nextYear = parseInt(next.year.split('/')[1])
        if (prevYear < nextYear) return -1;
        if (prevYear > nextYear) return 1;
        else return 0
    })
}


class MainPanel extends Component {

    state = {
        schoolYears: [],
        yearDropDownOptions: []
    }

    componentDidMount() {
        const defaultYear = '20/21'

        this.setState({
            yearDropDownOptions: generateSchoolYear(15, 30),
        })

        // creating a default academic year
        this.createSchoolYear(defaultYear);
        let addYearOptions = generateSchoolYear(15, 30);
        this.setState({
            yearDropDownOptions: addYearOptions.filter((options) => options.value !== defaultYear)
        })

    }
    
    createSchoolYear = (year) => {

        let schoolYears = this.state.schoolYears;
        schoolYears.push({
            year,
            terms: [
                [], [], [], []
            ]
        })

        sortSchoolYears(schoolYears);

        // remove added year from dropdown options
        let yearDropDownOptions = this.state.yearDropDownOptions.filter((option) => {
            return  option.value !== year;
        });

        this.setState({
            schoolYears: schoolYears,
            yearDropDownOptions: yearDropDownOptions,
        })
    }

    removeSchoolYear = (year) => {
        let schoolYears = this.state.schoolYears.filter((schoolYear) => {
            return schoolYear.year !== year;
        })

        let yearDropDownOptions = this.state.yearDropDownOptions;

        // adding removed year back to the dropdown options 
        yearDropDownOptions.push({
            label: year, value: year
        })
        yearDropDownOptions.sort((prev, next) => {
            const prevYear = parseInt(prev.value.split('/')[0])
            const nextYear = parseInt(next.value.split('/')[1])
            if (prevYear < nextYear) return -1;
            if (prevYear > nextYear) return 1;
            else return 0
        })

        this.setState({
            schoolYears: schoolYears,
            yearDropDownOptions: yearDropDownOptions,
        })
    }

    render() {
        return (
            <Container>
                <PlannerControls
                    createSchoolYear={this.createSchoolYear}
                    yearDropDownOptions={this.state.yearDropDownOptions}
                />
                <PlannerPane 
                    schoolYears={this.state.schoolYears}
                    removeSchoolYear={this.removeSchoolYear}
                />
            </Container>
        );
    }
}

export default MainPanel;
