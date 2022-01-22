import { useState, useLayoutEffect, useRef } from "react";
import {
  ExtendedUIContainer,
  StyledContainer,
  CompactUIContainer,
} from "./styled";
import { useDisclosure } from "@chakra-ui/react";
import { CourseItemMenu } from "./CourseItemMenu";
import { CourseDetailModal } from "./CourseDetailModal";

const EXTEND_UI_THRESHOLD = 210;

// the number of ms the window size must stay the same size before the
// dimension state variable is reset
const RESET_TIMEOUT = 150;

const shortenText = (maxCharacters, input) => {
  if (typeof input === "string" && input.length > maxCharacters) {
    return input.slice(0, maxCharacters - 1) + "...";
  }
  return input;
};

export const CourseItem = ({ isTentative, courseInfo }) => {
  const [bgColor, setBgColor] = useState(courseInfo.color);
  const [isCourseItemHover, setIsCourseItemHover] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // holds the timer for setTimeout and clearInterval
  let movementTimer = null;

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    updateContainerWidth();
  }, []);

  window.addEventListener("resize", () => {
    clearInterval(movementTimer);
    movementTimer = setTimeout(updateContainerWidth, RESET_TIMEOUT);
  });

  let compactUI = (
    <CompactUIContainer bgColor={bgColor}>
      <div className="course-code-box">
        <div className="department">
          {shortenText(7, courseInfo.departmentCode)}
        </div>
        <div className="number">{shortenText(5, courseInfo.number)}</div>
      </div>
    </CompactUIContainer>
  );

  let extentedUI = (
    <ExtendedUIContainer bgColor={bgColor}>
      <div className="top-box">
        <div className="course-code">{courseInfo.courseCode}</div>
        <div className="course-unit">{`${courseInfo.unit} ${
          parseFloat(courseInfo.unit) !== 1 ? "units" : "unit"
        }`}</div>
      </div>
      <div className="bottom-box">{courseInfo.title}</div>
    </ExtendedUIContainer>
  );

  return (
    <>
      <StyledContainer
        onMouseEnter={() => setIsCourseItemHover(true)}
        onMouseLeave={() => setIsCourseItemHover(false)}
        ref={containerRef}
      >
        {isTentative || containerWidth <= EXTEND_UI_THRESHOLD
          ? compactUI
          : extentedUI}
        <CourseItemMenu
          isTentative={isTentative}
          courseInfo={courseInfo}
          bgColor={bgColor}
          setBgColor={setBgColor}
          isCourseItemHover={isCourseItemHover}
          onModalOpen={onModalOpen}
        />
      </StyledContainer>
      <CourseDetailModal
        courseInfo={courseInfo}
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};
