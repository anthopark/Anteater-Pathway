import styled from 'styled-components';

const courseInfoCardBgColor = '#EDF1FC';
const textColor = '#1A2556';

export const RightPanelContainer = styled.div`
    height: 100%;
    padding: 1.2rem 1.2rem 1.2rem 0;
`;

// CourseInfoCard

export const CourseInfoCardContainer = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 20%;
    padding: 1.5rem 1.5rem;
    background-color: ${courseInfoCardBgColor};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    color: ${textColor};
    box-shadow: 0px 3px 7px 3px rgba(0,0,0, 0.1)
`;


export const DeptNumBox = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: .2rem;
    margin-bottom: 1rem;
    text-align: center;
`;

export const TitleBox = styled.div`
    font-size: 1.8rem;
    letter-spacing: .1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
`;

export const AdditionalInfoBox = styled.div`
    
    margin-bottom: 1rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const PreviouslyOfferedBox = styled.div`
    padding-top: .5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const termQuarterMap = {
    'Fall': "#F6C89C",
    'Winter': "#E0C4FB",
    'Spring': "#D0EFA7",
    'Summer': "#A7EFDE",
}

export const PreviousQuarter = styled.div`
    padding: .3rem .6rem; 
    background-color: ${({term}) => termQuarterMap[term]};
    opacity: .8;
    border-radius: 5px;
    margin: .3rem .4rem;
    font-size: 1.5rem;
`

export const InfoLabel = styled.label`
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: .1rem;
`;

export const AdditionalInfoText = styled.p`
    font-size: 1.6rem;
`;

export const IllustImage = styled.img`
    width: 100%;
    max-height: 20rem;
    margin: 5rem auto;
`

export const ExpandToggleButtonBox = styled.div`
    margin-top: .5rem;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const ExpandToggleButton = styled.div`
    width: 10rem;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgba(0, 0, 0, 0.3)

`;

export const ExpandToggleButtonText = styled.span`

`