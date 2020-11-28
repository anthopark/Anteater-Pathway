import styled from 'styled-components';

const textColor = "#2B3C86";

export const AcademicYearContainer = styled.div`
    width: 100%;
    margin-top: 4rem;
    
`;


export const AcademicYearHeader = styled.div`

`;

export const YearText = styled.span`
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: .2rem;
    color: ${textColor};
`;

export const QuarterGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 2rem;
`;

export const QuarterContainer = styled.div`
    border-radius: 20px;
    margin-top: 1.5rem;
    background-color: #fff;
    padding: 0 1.5rem;
    box-shadow: 0px 5px 7px 0 rgba(0,0,0,.2);
    
`;

export const QuarterHeader = styled.div`
    text-align: center;
    color: ${textColor};
    font-size: 1.7rem;
    letter-spacing: .1rem;
    padding: 1rem;
    font-weight: 700;
`;

export const QuarterCourses = styled.div`
    min-height: 4rem;
`;

export const QuarterFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    font-size: 1.4rem;
`;

export const TotalUnitBox = styled.span`

`;