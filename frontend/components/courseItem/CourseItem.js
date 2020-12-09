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



export const CourseItem = (props) => {

    const { searchedCourses } = useContext(AppContext);
    const { plannedCourses, setPlannedCourses } = useContext(AppContext);
    const { planData, setPlanData } = useContext(AppContext);
    const { setCurrentClickedCourse } = useContext(AppContext);

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isHover, setIsHover] = useState(false);

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

    const onRemoveButtonClick = () => {
        // remove from planData
        const newPlanData = [...planData];
        for (const academicYear of newPlanData) {
            for (const [term, courses] of Object.entries(academicYear)) {
                academicYear[term] = courses.filter((courseId) => courseId !== props.id);
            }
        }

        // remove from plannedCourses
        const newPlannedCourses = { ...plannedCourses };
        delete newPlannedCourses[props.id]

        setPlanData(newPlanData);

        // run after setPlanData is completed
        setTimeout(() => {
            setPlannedCourses(newPlannedCourses)
        }, 0);

        // reset currentClickedCourse
        setCurrentClickedCourse(null);
    }

    const updateCurrentClickedCourse = () => {
        if (plannedCourses[props.id]) {
            setCurrentClickedCourse(plannedCourses[props.id]);
        } else {
            // search in searchedCourses
            setCurrentClickedCourse(searchedCourses.filter(course => course._id === props.id)[0]);
        }
    }



    let minimalVersionUI = (
        <MinimalVersionContainer>
            <DeptText>
                {props.dept}
            </DeptText>
            <NumText>
                {props.num}
            </NumText>
            {isHover && props.isPlanned ?
                (<RemoveButton onClick={onRemoveButtonClick}>X</RemoveButton>)
                : undefined
            }
        </MinimalVersionContainer>
    )

    let extendedVersionUI = (
        <ExtendedVersionContainer>
            <UpperBox>
                <CourseInfoBox>{`${props.dept} ${props.num}`}</CourseInfoBox>
                <CourseInfoBox>{`${props.unit} Units`}</CourseInfoBox>
            </UpperBox>
            <LowerBox>
                <CourseTitleBox>{props.title}</CourseTitleBox>
            </LowerBox>
            {isHover && props.isPlanned ?
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
            onMouseDown={(e) => { updateCurrentClickedCourse(); }}
        >
            { containerWidth > 190 ? extendedVersionUI : minimalVersionUI}
        </CourseItemContainer>
    );
}

