import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  min-height: 10rem;
  background-color: ${({ theme }) => theme.colors.paneBg};
  border-radius: 15px;
  transition: all 0.3s;
  box-shadow: 0 1px 6px rgba(100, 100, 100, 0.1);
`;
