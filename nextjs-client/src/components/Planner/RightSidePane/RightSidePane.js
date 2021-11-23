import {
  StyledContainer,
  TentativePlannerContainer,
  CourseDetailUIContainer,
} from "./styled";
import { useState } from "react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import CourseItem from "../CourseItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const RightSidePane = () => {
  const [displayCourseDetail] = useState(false);
  return (
    <StyledContainer>
      {displayCourseDetail ? <CourseDetailUI /> : <TentativePlannerUI />}
    </StyledContainer>
  );
};

const TentativePlannerUI = () => {
  const { appUser } = useGlobalObjects();

  console.log(appUser);

  return (
    <TentativePlannerContainer>
      <div className="header">Tentatively Planned</div>
      <div className="content">
        {appUser.tentativePlanner.droppables.map((droppable, index) => (
          <Droppable key={index} droppableId={droppable["droppableId"]}>
            {(provided) => (
              <div
                className="course-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {droppable["courseItems"].map((course, index) => (
                  <Draggable
                    key={course.id}
                    draggableId={course.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="course-item-wrapper"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CourseItem isTentative courseInfo={course} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </TentativePlannerContainer>
  );
};

const CourseDetailUI = () => {
  return <CourseDetailUIContainer></CourseDetailUIContainer>;
};
