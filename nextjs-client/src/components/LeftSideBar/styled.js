import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: blue;

  .logo-container {
    width: 10rem;
    height: 10rem;
    background-color: green;
  }

  .menu-container {
    width: 10rem;
    height: 40rem;
    background-color: yellow;
  }
`;
