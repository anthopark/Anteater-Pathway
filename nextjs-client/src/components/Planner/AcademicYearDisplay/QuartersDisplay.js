import { Draggable, Droppable } from "react-beautiful-dnd";
import CourseItem from "../CourseItem";
import { QuartersDisplayContainer } from "./styled";

export const QuartersDisplay = ({ academicYear }) => {
  return (
    <QuartersDisplayContainer>
      {academicYear.quarters.map((quarter, index) => (
        <div className="quarter-box" key={index}>
          <div className="header">{quarter.header}</div>
          <Droppable droppableId={quarter.droppableId}>
            {(provided) => (
              <div
                className="course-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {quarter.plannedCourses.map((course, index) => (
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
                        <CourseItem courseInfo={course} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {quarter.totalUnit > 0 ? (
            <div className="footer">{quarter.totalUnit} units</div>
          ) : null}
        </div>
      ))}
    </QuartersDisplayContainer>
  );
};
