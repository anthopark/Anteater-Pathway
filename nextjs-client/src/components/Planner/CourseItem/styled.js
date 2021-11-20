import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const bgColors = {
  green: "#64ecbb",
};

const fontColors = {
  green: "#5C5C5C",
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
