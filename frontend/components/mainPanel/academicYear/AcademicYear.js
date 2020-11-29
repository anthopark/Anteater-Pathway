import { useState } from 'react';

import Quarter from './Quarter';

import {
    AcademicYearContainer,
    AcademicYearHeader,
    YearText,
    RemoveButton,
    QuarterGrid,
} from './styled';




export const AcademicYear = ({ year, quarters, removeAcademicYear }) => {
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
                <Quarter heading={`Fall 20${year}`} />
                <Quarter heading={`Winter 20${year + 1}`} />
                <Quarter heading={`Spring 20${year + 1}`} />
                <Quarter heading={`Summer 20${year + 1}`} />
            </QuarterGrid>
        </AcademicYearContainer>
    );
}

