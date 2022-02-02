import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 0rem 2rem 0 0;
  height: calc(100vh - 12rem);
  max-height: calc(100vh - 12rem);
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
`;
