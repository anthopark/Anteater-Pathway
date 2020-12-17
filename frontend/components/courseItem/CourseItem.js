import { useState, useRef, useContext, useLayoutEffect } from 'react';

import { AppContext } from '@components/AppContextProvider';
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
    RemoveButton,
} from './styled'

const EXTEND_UI_THRESHOLD = 185;



export const CourseItem = ({ courseInfo, ...props }) => {

    const { setCurrentClickedCourse } = useContext(AppContext);

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isHover, setIsHover] = useState(false);

    // holds the timer for setTimeout and clearInterval
    let movementTimer = null;

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
        clearInterval(movementTimer);
        movementTimer = setTimeout(updateContainerWidth, RESET_TIMEOUT);
    })

    const onRemoveButtonClick = () => {
        props.removeCourseItem(courseInfo._id);
        setCurrentClickedCourse(null);
    }


    let minimalVersionUI = (
        <MinimalVersionContainer>
            <DeptText>
                {courseInfo.dept}
            </DeptText>
            <NumText>
                {courseInfo.num}
            </NumText>
            {
                isHover && props.isPlanned ?
                    (<RemoveButton onClick={onRemoveButtonClick}>X</RemoveButton>)
                    : undefined
            }
        </MinimalVersionContainer>
    )

    let extendedVersionUI = (
        <ExtendedVersionContainer>
            <UpperBox>
                <CourseInfoBox>{`${courseInfo.dept} ${courseInfo.num}`}</CourseInfoBox>
                <CourseInfoBox>{`${courseInfo.unit} Units`}</CourseInfoBox>
            </UpperBox>
            <LowerBox>
                <CourseTitleBox>{courseInfo.title}</CourseTitleBox>
            </LowerBox>
            {
                isHover && props.isPlanned ?
                    (<RemoveButton onClick={onRemoveButtonClick}>X</RemoveButton>)
                    : undefined
            }
        </ExtendedVersionContainer>
    );

    return (
        <CourseItemContainer
            isSearched={props.searchList}
            isPlanned={props.isPlanned}
            ref={containerRef}
            onMouseEnter={(e) => { setIsHover(true); }}
            onMouseLeave={(e) => { setIsHover(false); }}
            onMouseDown={(e) => { setCurrentClickedCourse(courseInfo); }}
        >
            { containerWidth > EXTEND_UI_THRESHOLD ? extendedVersionUI : minimalVersionUI}
        </CourseItemContainer>
    );
}

