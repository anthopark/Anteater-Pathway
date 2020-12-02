import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import {
    CourseItemContainer,
    MinimalVersionContainer,
    DeptText,
    NumText,
    ExtendedVersionContainer,
    UpperBox,
    LowerBox,
    CourseInfoBox,
    CourseTitleBox,
} from './styled'



export const CourseItem = (props) => {

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // holds the timer for setTimeout and clearInterval
    let movement_timer = null;

    // the number of ms the window size must stay the same size before the
    // dimension state variable is reset
    const RESET_TIMEOUT = 150;

    const updateContainerWidth = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    }

    useLayoutEffect(() => {
        updateContainerWidth();
    }, [])

    window.addEventListener('resize', () => {
        clearInterval(movement_timer);
        movement_timer = setTimeout(updateContainerWidth, RESET_TIMEOUT);
    })

    let minimalVersionUI = (
        <MinimalVersionContainer>
            <DeptText>
                {props.dept}
            </DeptText>
            <NumText>
                {props.num}
            </NumText>
        </MinimalVersionContainer>
    )

    let extendedVersionUI = (
        <ExtendedVersionContainer>
            <UpperBox>
                <CourseInfoBox>{`${props.dept} ${props.num}`}</CourseInfoBox>
                <CourseInfoBox>{`${props.unit} Units`}</CourseInfoBox>
            </UpperBox>
            <LowerBox>
                <CourseTitleBox>{ props.title}</CourseTitleBox>
            </LowerBox>
        </ExtendedVersionContainer>
    );



    return (
        <CourseItemContainer searchList={props.searchList} ref={containerRef}>
            { containerWidth > 190 ? extendedVersionUI : minimalVersionUI}
        </CourseItemContainer>
    );
}

