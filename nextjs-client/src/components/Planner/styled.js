import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.pageBg};
  transition: background-color 0.4s linear;
`;
