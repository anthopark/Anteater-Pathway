import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@components/AppContextProvider';
import MainControls from './mainControls/';
import AcademicYear from './academicYear/';


import {
    MainPanelContainer,
    InnerBackgroundContainer,
    AcademicYearsBox,
} from './styled';

const defaultYear = '20';


const sortPlanData = (planData) => {
    planData.sort((prev, next) => {
        const prevYear = parseInt(Object.keys(prev)[0].slice(0, 2));
        const nextYear = parseInt(Object.keys(next)[0].slice(0, 2));
        if (prevYear < nextYear) return -1;
        else if (prevYear > nextYear) return 1;
        else return 0;
    })
}

export const MainPanel = () => {

    const { planData, setPlanData } = useContext(AppContext);
    const { yearOptions, setYearOptions } = useContext(AppContext);
    const { plannedCourses, setPlannedCourses } = useContext(AppContext);
    const [academicYears, setAcademicYears] = useState([]);

    const addAcademicYear = (year) => {
        const newAcademicYear = {};
        newAcademicYear[year + 'f'] = [];
        newAcademicYear[year + 'w'] = [];
        newAcademicYear[year + 'sp'] = [];
        newAcademicYear[year + 'su'] = [];

        const currentPlanData = [...planData];
        currentPlanData.push(newAcademicYear);

        sortPlanData(currentPlanData);
        setPlanData(currentPlanData);
        removeAddedYearOption(year);
    }

    // passed as prop to the AcademicYear for delete button
    const removeAcademicYear = (year) => {
        const newPlanData = planData.filter((academicYearData) => {
            // allow type coercion 
            if(year != Object.keys(academicYearData)[0].slice(0, 2)) {
                return true;
            } else {
                const coursesToDelete = Object.values(academicYearData);
                
                // to be run after setPlanData()
                setTimeout(() => {
                    deleteCoursesFromPlannedCourses(coursesToDelete);
                }, 0)
                
                return false;
            };
        })
        setPlanData(newPlanData);
        addRemovedYearOption(year);
    }

    // update year options upon adding academic year
    const removeAddedYearOption = (year) => {
        const newYearOptions = yearOptions.filter((option) => {
            return option.value.split('/')[0] !== year;
        })

        setYearOptions(newYearOptions);
    }

    // update year options upon deleting academic year
    const addRemovedYearOption = (year) => {
        const newYearOptions = [...yearOptions];
        newYearOptions.push({
            label: `${year} & ${year+1}`, value: `${year}/${year+1}` 
        })

        newYearOptions.sort((prev, next) => {
            const prevYear = parseInt(prev.value.split('/')[0]);
            const nextYear = parseInt(next.value.split('/')[0]);
            if (prevYear < nextYear) return -1;
            else if (prevYear > nextYear) return 1;
            else return 0;
        })

        setYearOptions(newYearOptions);
    }

    const deleteCoursesFromPlannedCourses = (courses) => {
        // courses given as [['courseId'], ['courseId'], ...]
        const newPlannedCourses = {...plannedCourses};

        for (const innerArr of courses) {
            for (const courseId of innerArr) {
                delete newPlannedCourses[courseId];
            }
        }

        setPlannedCourses(newPlannedCourses);
    }

    const populateAcademicYears = () => {
        const academicYearComponents = planData.map((academicYearData, index) => {
            return (
                <AcademicYear
                    key={index}
                    year={parseInt(Object.keys(academicYearData)[0].slice(0, 2))} // ex. extract 20 out of '20f'
                    academicYearData={academicYearData}
                    removeAcademicYear={removeAcademicYear}
                />
            )
        })

        setAcademicYears(academicYearComponents);
    }

    useEffect(() => {
        addAcademicYear(defaultYear);
    }, []);

    useEffect(() => {
        populateAcademicYears();
    }, [planData]);



    return (
        <MainPanelContainer>
            <InnerBackgroundContainer>

                <MainControls
                    addAcademicYear={addAcademicYear}
                 />

                <AcademicYearsBox>
                    {academicYears}
                </AcademicYearsBox>

            </InnerBackgroundContainer>
        </MainPanelContainer>
    );
}