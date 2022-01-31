import { StyledContainer } from "./styled";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import CourseItem from "@components/Planner/CourseItem";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSavePlanner } from "src/hooks/useSavePlanner";

export const TentativePlanner = () => {
  const { appUser, updateAppUser } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();

  const handleEmptyButtonClick = () => {
    appUser.tentativePlanner.deleteAllCourses();
    updateAppUser(appUser);
    savePlannerToBackend(appUser);
  };

  return (
    <StyledContainer>
      <div className="header">
        <div className="title">Tentatively Planned</div>
        <div className="clear-all-box">
          {!appUser.tentativePlanner.isEmpty() ? (
            <a className="clear-all-button" onClick={handleEmptyButtonClick}>
              <FontAwesomeIcon
                icon={["fas", "eraser"]}
                style={{ marginRight: ".4rem", fontSize: "1.4rem" }}
              />
              Empty
            </a>
          ) : null}
        </div>
      </div>
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
      {appUser.tentativePlanner.totalUnit > 0 ? (
        <div className="footer">
          <div className="total-unit">{`${appUser.tentativePlanner.totalUnit} units`}</div>
        </div>
      ) : null}
    </StyledContainer>
  );
};
