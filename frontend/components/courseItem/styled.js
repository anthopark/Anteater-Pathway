import MainControls from '@components/mainPanel/mainControls';
import styled, {keyframes, css} from 'styled-components';

const itemBgColor = "#EBE0F6";
const courseTextColor = "#1A2556"
const removeButtonColor = "#E0787E";
const placeHolderTextColor = "#747474";

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
    padding: .1rem 1rem;
    display: inline-block;
    background-color: ${removeButtonColor};
    color: #EAEAEA;
    text-align: center;
    cursor: pointer;

    position: absolute;
    top: 7px;
    ${({isCustomUnits}) => isCustomUnits ? 
        css`left: 10px;` 
        : css`right: 10px;`
    }

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

// CustomUnitForm

const buttonBgColor = "#4B8AAE";
const buttonTextColor = "#EAEAEA";

export const CustomUnitsFormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 7px;
    right: 10px;
    z-index: 10;
`;

export const FormBox = styled.form`
    animation: ${fadeIn} 1s;
    width: 9rem;
    display: flex;
    justify-content: space-between;
`;

export const IconBox = styled.div`
    width: 9rem;
    display: flex;
    justify-content: center;
`;


export const UnitInput = styled.input`
    width: 4rem;
    height: 2rem;
    padding: .2rem .5rem;
    margin: 0 0;
    border-radius: 5px;
    outline: none;
    border: transparent;
    transition: .3s;
    border: 1px solid dodgerblue;

    ${({isFormValid}) => (
        isFormValid ?
        ''
        :
        css`
        border:transparent;
        box-shadow: 0px 1px 3px 2px #EB6C6C;
        `
    )}
    
    &:focus {
        border: 1px solid dodgerblue; 
    }

    ::placeholder {
        color: ${placeHolderTextColor};
        opacity: .8;
    }
`

export const SubmitButton = styled.button`
    background: none;
    border:none;
    padding: 0;
    cursor: pointer;
    outline: inherit;

    width: 4.7rem;
    height: 2rem;
    font-weight: 700;
    border-radius: 5px;
    background-color: ${buttonBgColor};
    color: ${buttonTextColor};
    font-size: 1.3rem;
`;