import { useState } from "react";
import {
  MenuTrigger,
  MenuContainer,
  CourseColorPickerContainer,
  ColorPicker,
} from "./styled";
import { CourseDetailModal } from "./CourseDetailModal";
import { Popover } from "react-tiny-popover";
import { useDisclosure } from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const availableColors = [
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
];

export const CourseItemMenu = ({
  courseInfo,
  isTentative,
  bgColor,
  setBgColor,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const { appUser, updateAppUser } = useGlobalObjects();

  const handleDelete = () => {
    if (isTentative) {
      appUser.tentativePlanner.deleteCourse(courseInfo.id);
    } else {
      appUser.planner.deleteCourse(courseInfo.id);
    }

    updateAppUser(appUser);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      padding={5}
      onClickOutside={() => setIsPopoverOpen(false)}
      isLazy={true}
      content={
        <MenuContainer>
          {courseInfo.isCustom ? null : (
            <div className="info-link-container">
              <a className="info-link" onClick={onModalOpen}>
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
              <CourseDetailModal
                courseInfo={courseInfo}
                isModalOpen={isModalOpen}
                onModalClose={onModalClose}
              />
            </div>
          )}

          <div className="color-picker-container">
            <CourseColorPicker
              isTentative={isTentative}
              courseInfo={courseInfo}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </div>
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

const CourseColorPicker = ({
  courseInfo,
  isTentative,
  bgColor,
  setBgColor,
}) => {
  const [currentColor, setCurrentColor] = useState(bgColor);
  const { appUser, updateAppUser } = useGlobalObjects();

  const handleColorPickerClick = (color) => {
    setCurrentColor(color);
    setBgColor(color);

    if (isTentative) {
      appUser.tentativePlanner.updateCourseColor(courseInfo.id, color);
    } else {
      appUser.planner.updateCourseColor(courseInfo.id, color);
    }

    updateAppUser(appUser);
  };

  return (
    <CourseColorPickerContainer>
      {availableColors.map((color, index) => (
        <ColorPicker
          key={index}
          color={color}
          currentColor={currentColor}
          onClick={() => handleColorPickerClick(color)}
        >
          <div className="color-box"></div>
        </ColorPicker>
      ))}
    </CourseColorPickerContainer>
  );
};
