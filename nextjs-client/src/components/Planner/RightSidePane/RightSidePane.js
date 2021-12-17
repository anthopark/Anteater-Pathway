import { StyledContainer, TentativePlannerContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import CourseItem from "../CourseItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const RightSidePane = () => {
  return (
    <StyledContainer>
      <TentativePlannerUI />
    </StyledContainer>
  );
};

const TentativePlannerUI = () => {
  const { appUser } = useGlobalObjects();

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
