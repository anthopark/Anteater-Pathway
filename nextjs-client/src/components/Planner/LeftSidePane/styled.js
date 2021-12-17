import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: oxygen;
  color: ${({ theme }) => theme.colors.defaultText};

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
