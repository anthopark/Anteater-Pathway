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
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bbbbbb;

  .right-end-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding-left: 2rem;
    width: 30rem;
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
