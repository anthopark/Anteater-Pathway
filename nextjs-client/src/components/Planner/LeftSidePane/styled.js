import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: oxygen;
  color: ${({ theme }) => theme.colors.defaultText};
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
  }
  .accordion-panel-box {
    padding: 0 2rem;
    font-size: 2rem;
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
