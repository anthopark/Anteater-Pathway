import { RegularContainer, TentativeContainer } from "./styled";
import { useState } from "react";

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

export const CourseItem = ({ isTentative, courseInfo }) => {
  const [bgColor] = useState("green");

  let CourseItemUI;

  if (isTentative) {
    CourseItemUI = (
      <TentativeContainer bgColor={bgColor}>
        <div className="course-code-box">
          <div className="department">
            {shortenText(7, courseInfo.departmentCode)}
          </div>
          <div className="number">{shortenText(5, courseInfo.number)}</div>
        </div>
      </TentativeContainer>
    );
  } else {
    CourseItemUI = <RegularContainer></RegularContainer>;
  }

  return CourseItemUI;
};
