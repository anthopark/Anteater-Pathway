import { Droppable } from "react-beautiful-dnd";
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
              ></div>
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
