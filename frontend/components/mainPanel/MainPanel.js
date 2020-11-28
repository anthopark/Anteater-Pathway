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

export const MainPanel = () => {
    const { planData, setPlanData } = useContext(AppContext);
    const [academicYears, setAcademicYears] = useState([]);

    const addAcademicYear = (year) => {
        const newAcademicYear = {};
        newAcademicYear[year + 'f'] = [];
        newAcademicYear[year + 'w'] = [];
        newAcademicYear[year + 'sp'] = [];
        newAcademicYear[year + 'su'] = [];

        const currentPlanData = [...planData];
        currentPlanData.push(newAcademicYear);
        setPlanData(currentPlanData);
    }

    const populateAcademicYears = () => {
        if (planData.length > 0) {
            const academicYearComponents = planData.map((academicYearData, index) => {
                return (
                    <AcademicYear
                        key={index}
                        year={parseInt(Object.keys(academicYearData)[0].slice(0, 2))} // ex. extract 20 out of '20f'
                        quarters={academicYearData}
                    />
                )
            })

            setAcademicYears(academicYearComponents);
        }

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
                
                <MainControls />

                <AcademicYearsBox>
                    {academicYears}
                </AcademicYearsBox>

            </InnerBackgroundContainer>
        </MainPanelContainer>
    );
}