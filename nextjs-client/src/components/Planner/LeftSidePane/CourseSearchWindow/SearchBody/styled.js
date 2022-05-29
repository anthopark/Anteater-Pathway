import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 19px;
  font-family: oxygen;

  // Add a hover element
`;

export const resultScrollbar = styled.div`
  padding: 0rem 2rem 0 0;
  height: calc(100vh - 12rem);
  max-height: calc(100vh - 12rem);
  overflow-y: auto;
  overflow-x: hidden;

  .result-container {
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    width: 100%;
    padding: 0 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbar};
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.scrollbarHover};
    }

    ::-webkit-scrollbar-button {
      display: none;
    }
  }
`;
