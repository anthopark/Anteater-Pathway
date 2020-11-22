import styled from 'styled-components';

const itemBgColor = "#EBE0F6";
const courseTextColor = "#1A2556"

export const CourseItemContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    border-radius: 10px;
    background-color: ${itemBgColor};
    height: 3.6rem;
    min-height: 3.6rem;
    /* padding: 0 2rem; */
    margin-bottom: .8rem;
    margin-right: .8rem;

    font-size: 1.6rem;
    color: ${courseTextColor};

`;

export const DeptText = styled.div`
    text-align: center;
    letter-spacing: .2rem;
`;

export const NumText = styled.div`
    text-align: center;
    letter-spacing: .2rem;
`;