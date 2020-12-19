import { useState, useRef, useContext, useLayoutEffect, useEffect } from 'react';

import { AppContext } from '@components/AppContextProvider';
import CustomUnitsForm from './CustomUnitsForm';

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
    CustomUnitsFormContainer,
} from './styled'

const EXTEND_UI_THRESHOLD = 185;

const isCustomUnits = (units) => {
    return units.includes('-')
}


export const CourseItem = ({ courseInfo, ...props }) => {

    const { setCurrentClickedCourse } = useContext(AppContext);
    const { customUnitCourses, setCustomUnitCourses } = useContext(AppContext);

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
        
        // delete the custom input value 
        if (courseInfo._id in customUnitCourses) {
            const newCustomUnitCourses = { ...customUnitCourses }
            delete newCustomUnitCourses[courseInfo._id];
            setCustomUnitCourses(newCustomUnitCourses);
        }
    }

    let hoverStateUI = (
        <>
            <RemoveButton
                onClick={onRemoveButtonClick}
                isCustomUnits={isCustomUnits(courseInfo.unit)}
            >
                X
            </RemoveButton>
            <>
                {
                    isCustomUnits(courseInfo.unit) ?
                        (
                            <CustomUnitsForm
                                courseId={courseInfo._id}
                                minUnit={parseInt(courseInfo.unit.split('-')[0])}
                                maxUnit={parseInt(courseInfo.unit.split('-')[1])}
                            />
                        )
                        : undefined
                }
            </>
        </>
    );


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
                    hoverStateUI
                    : undefined
            }
        </MinimalVersionContainer>
    )

    let extendedVersionUI = (
        <ExtendedVersionContainer>
            <UpperBox>
                <CourseInfoBox>{`${courseInfo.dept} ${courseInfo.num}`}</CourseInfoBox>
                <CourseInfoBox>{`${ courseInfo._id in customUnitCourses ? customUnitCourses[courseInfo._id]: courseInfo.unit } Units`}</CourseInfoBox>
            </UpperBox>
            <LowerBox>
                <CourseTitleBox>{courseInfo.title}</CourseTitleBox>
            </LowerBox>
            {
                isHover && props.isPlanned ?
                    hoverStateUI
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

