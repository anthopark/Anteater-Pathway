import { useState } from 'react';

import Quarter from './Quarter';

import {
    AcademicYearContainer,
    AcademicYearHeader,
    YearText,
    RemoveButton,
    QuarterGrid,
} from './styled';




export const AcademicYear = ({ year, yearPlanData, removeAcademicYear }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AcademicYearContainer
            onMouseEnter={() => setIsHovered(true)}
            onFocus={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AcademicYearHeader>
                <YearText>
                    {`20${year} & 20${year + 1}`}
                </YearText>
                {
                    isHovered ?
                        <RemoveButton onClick={() => removeAcademicYear(year)}>X</RemoveButton>
                        : undefined
                }
            </AcademicYearHeader>

            <QuarterGrid>
                <Quarter
                    quarterId={year + 'f'}
                    heading={`Fall 20${year}`}
                    courses={yearPlanData[year + 'f']}
                />
                <Quarter
                    quarterId={year + 'w'}
                    heading={`Winter 20${year + 1}`}
                    courses={yearPlanData[year + 'w']}
                />
                <Quarter
                    quarterId={year + 'sp'}
                    heading={`Spring 20${year + 1}`}
                    courses={yearPlanData[year + 'sp']}
                />
                <Quarter
                    quarterId={year + 'su'}
                    heading={`Summer 20${year + 1}`}
                    courses={yearPlanData[year + 'su']}
                />
            </QuarterGrid>
        </AcademicYearContainer>
    );
}

