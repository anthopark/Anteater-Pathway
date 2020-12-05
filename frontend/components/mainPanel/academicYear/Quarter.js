import { useState, useContext, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { AppContext } from '@components/AppContextProvider';
import CourseItem from '@components/courseItem';

import {
    QuarterContainer,
    QuarterHeader,
    QuarterCourses,
    QuarterFooter,
    TotalUnitBox,
} from './styled';

const Quarter = ({ heading, courses, quarterId }) => {


    const { plannedCourses } = useContext(AppContext);

    const [totalUnit, setTotalUnit] = useState(0);

    useEffect(() => {
        // compute total unit upon re-rendering
        let units = 0;
        courses.forEach(courseId => {
            units += parseInt(plannedCourses[courseId].unit);
        })
        setTotalUnit(units);
    })

    const courseItems = courses.map((courseId, index) => (
        <Draggable
            key={courseId}
            draggableId={courseId}
            index={index}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CourseItem
                        key={index}
                        id={courseId}
                        dept={plannedCourses[courseId].dept}
                        num={plannedCourses[courseId].num}
                        unit={plannedCourses[courseId].unit}
                        title={plannedCourses[courseId].title}
                        isPlanned={true}
                    />
                </div>
            )}
        </Draggable>

    ));

    return (
        <QuarterContainer>
            <QuarterHeader>
                {heading}
            </QuarterHeader>

            <Droppable droppableId={quarterId}>
                {(provided) => (
                    <QuarterCourses
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {courseItems}
                        {provided.placeholder}
                    </QuarterCourses>
                )}

            </Droppable>

            <QuarterFooter>
                {totalUnit === 0 ? undefined : (
                    <TotalUnitBox>
                        {`${totalUnit} units`} 
                    </TotalUnitBox>
                )}
            </QuarterFooter>
        </QuarterContainer>
    );
}

export default Quarter;