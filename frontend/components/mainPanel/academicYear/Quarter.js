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


const Quarter = ({ quarterId, heading, courses }) => {
    const { planData, setPlanData } = useContext(AppContext);
    const { customUnitCourses } = useContext(AppContext);

    const [totalUnits, setTotalUnits] = useState(0);

    const removeCourseItem = (courseId) => {
        // delete from planData
        const newPlanData = [...planData];
        for (const yearPlanData of newPlanData) {
            for (const [term, courses] of Object.entries(yearPlanData)) {
                yearPlanData[term] = courses.filter((course) => course._id !== courseId);
            }
        }
        setPlanData(newPlanData);
    }

    useEffect(() => {
        // compute total units
        let total = 0;
        courses.forEach((course) => {
            if (course._id in customUnitCourses) {
                total += parseInt(customUnitCourses[course._id]);
            } else {
                total += parseInt(course.unit);
            }
            
        })
        setTotalUnits(total);
    }, [planData, customUnitCourses])

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
                        {
                            courses.map((course, index) => (
                                <Draggable
                                    key={course._id}
                                    draggableId={course._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <CourseItem
                                                courseInfo={course}
                                                isPlanned={true}
                                                removeCourseItem={removeCourseItem}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }

                        {provided.placeholder}
                    </QuarterCourses>
                )}
            </Droppable>

            <QuarterFooter>
                {totalUnits === 0 ? undefined : (
                    <TotalUnitBox>
                        {`${totalUnits} units`}
                    </TotalUnitBox>
                )}
            </QuarterFooter>
        </QuarterContainer>
    );
}

export default Quarter;