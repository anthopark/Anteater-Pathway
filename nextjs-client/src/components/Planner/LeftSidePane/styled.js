import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const widthfadeOut = keyframes`
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
`;

export const StyledContainer = styled.div`
  font-family: oxygen;
  color: ${({ theme }) => theme.colors.defaultText};
  .accordion-item-wrapper {
    ${({ isRemovingAccordion }) =>
      isRemovingAccordion
        ? css`
            width: 0%;
            animation: ${widthfadeOut} 0.3s ease-out;
          `
        : null}
  }
  .accordion-top {
    display: flex;
  }

  .accordion-button-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .academic-year-text {
      letter-spacing: 1px;
      font-size: 2.1rem;
    }

    ${({ isRemovingAccordion }) =>
      isRemovingAccordion
        ? css`
            display: none;
          `
        : null}
  }
`;

export const RemoveBox = styled.div`
  width: 0rem;
  ${({ isHover }) =>
    isHover
      ? css`
          width: 5rem;
          display: flex;
          padding: 0 2rem 0 0;
        `
      : null}
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  .remove-box-icon {
    animation: ${fadeIn} 0.7s ease;
  }
`;

export const QuartersDisplayContainer = styled.div`
  width: 100%;
  display: grid;
  padding: 0 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.3rem;
  font-family: oxygen;
  .quarter-box {
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: lightsalmon;

    .header {
      padding-bottom: 0.5rem;
      letter-spacing: 1px;
      font-size: 1.5rem;
    }

    .course-list {
      width: 100%;
      padding: 0.5rem 1rem;
      min-height: 6rem;
      background-color: lightsteelblue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .course-item-wrapper {
      }
    }

    .footer {
      width: 100%;
      text-align: right;
      letter-spacing: 1px;
      font-size: 1.4rem;
    }
  }
`;
