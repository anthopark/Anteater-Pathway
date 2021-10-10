import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.pageBg};
  transition: background-color 0.4s linear;
`;

export const TopLayout = styled.div`
  width: 100%;
  height: 10rem;
  display: grid;
  grid-template-columns: auto 30rem;

  .left-pane {
    width: 100%;
    display: grid;
    grid-template-columns: 1.3fr 4fr 1fr;
  }

  .right-pane {
    background-color: lightcoral;
  }
`;

export const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 30rem;
  background-color: lime;

  .left-pane {
    background-color: lightseagreen;
  }

  .right-pane {
  }
`;
