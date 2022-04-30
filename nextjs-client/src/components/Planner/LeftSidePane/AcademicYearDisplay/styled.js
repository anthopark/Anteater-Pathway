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

export const AcademicYearDisplayContainer = styled.div`
  transition: all 0.3s;
`;

export const AccordionItemContainer = styled.div`
  font-family: oxygen;
  color: ${({ theme }) => theme.colors.defaultText};

  .accordion-item-wrapper {
    ${({ isRemovingAccordion }) =>
      isRemovingAccordion
        ? css`
            width: 0%;
            animation: ${widthfadeOut} 0.2s ease-out;
          `
        : null}
  }
  .accordion-top {
    display: flex;
  }

  .accordion-button-box {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    .academic-year-text {
      padding-left: 0.6rem;
      padding-bottom: 0.2rem;
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
  ${({ isOpen }) =>
    isOpen
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
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: start;
  padding: 0 0.8rem;
  column-gap: 1.3rem;
  font-family: oxygen;

  .quarter-box {
    padding: 1rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.quarterBoxBg};
    .header {
      padding-bottom: 0.3rem;
      letter-spacing: 1px;
      font-size: 1.5rem;
      text-align: center;
    }

    .course-list {
      width: 100%;
      padding: 0.2rem;
      min-height: 4rem;
      display: flex;
      flex-direction: column;

      align-items: center;
      .course-item-wrapper {
        width: 100%;
        padding: 0.3rem;
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
