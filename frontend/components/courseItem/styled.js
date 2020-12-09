import MainControls from '@components/mainPanel/mainControls';
import styled, {keyframes, css} from 'styled-components';

const itemBgColor = "#EBE0F6";
const courseTextColor = "#1A2556"
const removeButtonColor = "#E0787E";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;


export const CourseItemContainer = styled.div`
    width: ${({ isSearched }) => isSearched ? 'auto' : '100%'};
    border-radius: 10px;
    background-color: ${itemBgColor};

    margin-bottom: ${({ isSearched }) => isSearched ? '.8rem' : '.5rem'};
    // apply margin right only when listed on search result
    // due to spacing with scroll bar
    margin-right: ${({ isSearched }) => isSearched ? '.8rem' : '0rem'};

    color: ${courseTextColor};
    transition: all .3s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);

        // only when the course is planned on a Quarter component
        ${({isPlanned}) => isPlanned ? 
        css`
        &::after {
            content: "";
            display: block;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            background-color: rgba(241, 241, 241, .75);
            position: absolute;
            top: 0;
            left: 0;
            animation: ${fadeIn} 1s ease;}` 
        : ''}
    }
`;

// minimal version

export const MinimalVersionContainer = styled.div`
    width: 100%;
    padding: .8rem;
    display: flex;
    justify-content: space-around;
    font-size: 1.6rem;
    position: relative;
`;

export const DeptText = styled.div`
    text-align: center;
    letter-spacing: .2rem;
`;

export const NumText = styled.div`
    text-align: center;
    letter-spacing: .2rem;
`;

// extended version

export const ExtendedVersionContainer = styled.div`
    width: 100%;
    padding: .5rem .7rem;
    position: relative;
`;

export const UpperBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .2rem;
`;

export const CourseInfoBox = styled.span`
    display: inline-block;
    color: ${courseTextColor};
    font-size: 1.6rem;
    font-weight: 700;
`;

export const LowerBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 .3rem;
`;

export const CourseTitleBox = styled.span`
    display: inline-block;
    font-size: 1.5rem;
`;

export const RemoveButton = styled.a`

    width: 3rem;
    height: 2rem;
    margin-left: 1rem;
    margin-top: .4rem;
    padding: .1rem 1rem;
    display: inline-block;
    background-color: ${removeButtonColor};
    color: #EAEAEA;
    text-align: center;
    cursor: pointer;

    position: absolute;
    top: 3px;
    right: 10px;
    z-index: 10;
    
    font-size: 1.3rem;
    font-weight: 700;
    border-radius: 5px;

    animation: ${fadeIn} 1s;
    transition: transform .3s;
    
    &:link,
    &:visited {
        text-decoration: none;
    }
`;