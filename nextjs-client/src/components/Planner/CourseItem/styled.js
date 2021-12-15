import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const darkFontColor = "#5C5C5C";
const lightFontColor = "#E6EAE7";

const bgColors = {
  color1: "#64ecbb",
  color2: "#E19F91",
  color3: "#E0C08F",
  color4: "#9DED4E",
  color5: "#63A2DB",
  color6: "#A79DEB",
  color7: "#CA6DEB",
  color8: "#A8CB1E",
};

const fontColors = {
  color1: darkFontColor,
  color2: darkFontColor,
  color3: darkFontColor,
  color4: darkFontColor,
  color5: lightFontColor,
  color6: darkFontColor,
  color7: lightFontColor,
  color8: darkFontColor,
};

const courseItemBorderRadius = "8px";

export const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  transition: all 0.3s;
  font-family: oxygen;
  border-radius: ${courseItemBorderRadius};
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 2px 5px 0px ${({ theme }) => theme.colors.courseItemShadow};

    &::after {
      content: "";
      display: block;
      border-radius: ${courseItemBorderRadius};
      width: 100%;
      height: 100%;
      background-color: rgba(241, 241, 241, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      animation: ${fadeIn} 1s ease;
      cursor: move;
    }
  }
`;

export const TentativeContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  color: ${({ bgColor }) => fontColors[bgColor]};
  border-radius: ${courseItemBorderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 1px;

  .course-code-box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;

export const RegularContainer = styled.div``;

export const MenuTrigger = styled.div`
  cursor: pointer;
  position: absolute;
  top: 25%;
  right: 0.7rem;
  z-index: 10;
  animation: ${fadeIn} 1s;
  .trigger-link {
    display: inline-block;
  }
`;

export const MenuContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.courseMenuBg};
  border: 3px solid #5bbbe4;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-family: Oxygen;
  font-size: 1.4rem;

  .info-link-container {
    padding: 0.3rem 1rem;
    .info-link {
      cursor: pointer;
      display: flex;
      text-decoration: none;
      .info-text {
        letter-spacing: 0.1rem;
        margin-left: 0.5rem;
        color: ${({ theme }) => theme.colors.defaultText};
      }
    }
  }

  .color-picker-container {
    padding-top: 1rem;
    padding-bottom: 0.2rem;
    border-top: 2px solid #d9d9d9;
    border-bottom: 2px solid #d9d9d9;
  }

  .delete-container {
    padding: 0.3rem 1rem;
    .delete-link {
      cursor: pointer;
      display: flex;
      text-decoration: none;
      .delete-text {
        letter-spacing: 0.1rem;
        margin-left: 0.5rem;
        color: ${({ theme }) => theme.colors.redText};
      }
    }
  }
`;

export const CourseColorPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 13rem;
  padding-left: 1rem;
  padding-right: 0.2rem;
`;

export const ColorPicker = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid
    ${({ currentColor, color }) =>
      currentColor === color ? "#13AACB" : "#B2C0C3"};
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;

  .color-box {
    width: 16px;
    height: 16px;
    background-color: ${({ color }) => bgColors[color]};
  }
`;
export const ModalBodyLoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBodyErrorContainer = styled(ModalBodyLoadingContainer)`
  letter-spacing: 1px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.redText};
`;

export const ModalBodyContainer = styled(ModalBodyLoadingContainer)`
  flex-direction: column;
  width: 100%;

  .course-info-property-container {
    width: 100%;
    margin: 0.3rem 0;
    .course-info-property {
      font-size: 1.4rem;
      font-weight: bold;
      text-align: left;
      letter-spacing: 1px;
      margin-bottom: 0.3rem;
    }

    .course-info-content {
      font-size: 1.3rem;
      padding-left: 0.3rem;
    }
  }

  .ge-category-text {
    margin-left: 0.5rem;
    font-weight: normal;
  }

  .offered-terms-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0.3rem;
    .term-box {
      font-size: 1.1rem;
      padding: 0.6rem 0.8rem;
      letter-spacing: 1px;
      margin-right: 0.7rem;
      margin-bottom: 0.7rem;
      border-radius: 7px;
    }
  }
`;
