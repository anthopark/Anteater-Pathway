import {
  RegularContainer,
  StyledContainer,
  TentativeContainer,
  MenuTrigger,
  MenuContainer,
} from "./styled";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalObjects } from "@components/GlobalContextProvider";

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

export const CourseItem = ({ isTentative, courseInfo }) => {
  const [bgColor] = useState("green");
  const [isHover, setIsHover] = useState(false);

  let CourseItemUI;

  if (isTentative) {
    CourseItemUI = (
      <>
        <TentativeContainer bgColor={bgColor}>
          <div className="course-code-box">
            <div className="department">
              {shortenText(7, courseInfo.departmentCode)}
            </div>
            <div className="number">{shortenText(5, courseInfo.number)}</div>
          </div>
        </TentativeContainer>
      </>
    );
  } else {
    CourseItemUI = <RegularContainer></RegularContainer>;
  }

  return (
    <StyledContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {CourseItemUI}
      {isHover ? <CourseItemMenu courseInfo={courseInfo} /> : null}
    </StyledContainer>
  );
};

const CourseItemMenu = ({ courseInfo }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { appUser, updateAppUser } = useGlobalObjects();
  const handleDelete = () => {
    appUser.tentativePlanner.deleteCourse(courseInfo.id);
    updateAppUser(appUser);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      padding={5}
      onClickOutside={() => setIsPopoverOpen(false)}
      content={
        <MenuContainer>
          <div className="info-link-container">
            <a className="info-link">
              <FontAwesomeIcon
                icon={["fas", "info-circle"]}
                style={{
                  fontSize: "1.6rem",
                  marginTop: ".3rem",
                  color: "#5C5C5C",
                }}
              />
              <p className="info-text">info</p>
            </a>
          </div>
          <div className="color-select-container"></div>
          <div className="delete-container">
            <a className="delete-link" onClick={handleDelete}>
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  fontSize: "1.6rem",
                  marginTop: ".3rem",
                  color: "#E34522",
                }}
              />
              <p className="delete-text">delete</p>
            </a>
          </div>
        </MenuContainer>
      }
    >
      <MenuTrigger>
        <a
          className="trigger-link"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <FontAwesomeIcon
            icon={["fas", "ellipsis-v"]}
            style={{ fontSize: "1.6rem", color: "#5C5656" }}
          />
        </a>
      </MenuTrigger>
    </Popover>
  );
};
