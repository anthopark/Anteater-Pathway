import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: Oxygen;
  margin-top: 0.4rem;
  color: ${({ theme }) => theme.colors.defaultText};
`;
