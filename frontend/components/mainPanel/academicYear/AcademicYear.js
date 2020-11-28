import Quarter from './Quarter';

import {
    AcademicYearContainer,
    AcademicYearHeader,
    YearText,
    QuarterGrid,
} from './styled';




export const AcademicYear = ({ year, quarters }) => {
    return (
        <AcademicYearContainer>
            <AcademicYearHeader>
                <YearText>
                    {`20${year} & 20${year + 1}`}
                </YearText>

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

