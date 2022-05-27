import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .text-box {
    padding-top: 0.3rem;
    margin-left: 0.4rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.paneHeaderFont};
  }
`;
