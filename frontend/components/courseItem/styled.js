import MainControls from '@components/mainPanel/mainControls';
import styled from 'styled-components';

const itemBgColor = "#EBE0F6";
const courseTextColor = "#1A2556"


export const CourseItemContainer = styled.div`
    width: ${({searchList}) => searchList ? 'auto' : '100%' };
    border-radius: 10px;
    background-color: ${itemBgColor};

    margin-bottom: ${({searchList}) => searchList ? '.8rem' : '.5rem' };
    // apply margin right only when listed on search result
    // due to spacing with scroll bar
    margin-right: ${({searchList}) => searchList ? '.8rem' : '0rem' };

    color: ${courseTextColor};
    transition: all .3s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2); 
    }
`;

// minimal version

export const MinimalVersionContainer = styled.div`
    width: 100%;
    padding: .8rem;
    display: flex;
    justify-content: space-around;
    font-size: 1.6rem;
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