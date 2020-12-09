import styled, { keyframes } from 'styled-components';

const textColor = "#2B3C86";
const removeButtonColor = "#95AFF4";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const AcademicYearContainer = styled.div`
    width: 100%;
    margin-bottom: 4rem;
    padding-right: 1rem;
    
`;

export const AcademicYearHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const YearText = styled.span`
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: .2rem;
    color: ${textColor};
`;

export const RemoveButton = styled.a`

    width: 3.5rem;
    height: 2.3rem;
    margin-left: 1rem;
    margin-top: .4rem;
    padding: .2rem 1rem;
    display: inline-block;
    background-color: ${removeButtonColor};
    color: #EAEAEA;
    text-align: center;
    cursor: pointer;
    
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 10px;

    animation: ${fadeIn} .5s;
    transition: transform .3s;
    
    &:link,
    &:visited {
        text-decoration: none;
    }

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0px);
    }
`;

export const QuarterGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 2rem;
    align-items: start;
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
    width: 100%;
    display: grid;
    
    min-height: 5rem;
    
`;

export const QuarterFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: .5rem;
    padding-bottom: 1rem;
    font-size: 1.4rem;
    color: ${textColor};
`;

export const TotalUnitBox = styled.span`

`;