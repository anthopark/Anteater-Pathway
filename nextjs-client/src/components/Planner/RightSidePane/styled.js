import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  min-height: 10rem;
  background-color: ${({ theme }) => theme.colors.paneBg};
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(100, 100, 100, 0.1);
`;
