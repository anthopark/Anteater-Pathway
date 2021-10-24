import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.pageBg};
  transition: background-color 0.4s linear;
  padding: 0 2rem;
`;

export const TopLayout = styled.div`
  width: 100%;
  height: 9rem;
  display: grid;
  grid-template-columns: auto minmax(20rem, 30rem);
  border-bottom: 1px solid #bbbbbb;

  .left-pane {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }

  .right-pane {
  }
`;

export const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(auto, 3fr) minmax(30rem, 1fr);
  .left-pane {
  }

  .right-pane {
    background-color: lightgrey;
  }
`;
