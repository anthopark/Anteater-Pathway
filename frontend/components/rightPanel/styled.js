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
`;


export const DeptNumBox = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: .2rem;
    margin-bottom: 1rem;
    text-align: center;
`;

export const TitleBox = styled.div`
    font-size: 1.7rem;
    letter-spacing: .1rem;
    margin-bottom: 1rem;
`;

export const AdditionalInfoBox = styled.div`
    
    margin-bottom: 1rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

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