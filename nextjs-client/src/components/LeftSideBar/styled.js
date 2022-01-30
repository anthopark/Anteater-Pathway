import styled from "styled-components";
import { StyledLink } from "@components/share-styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.leftSideBarBg};
  align-items: center;
  padding: 1.5rem 0.5rem;

  .logo-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .donation-icon-container {
      position: relative;
      width: 3.5rem;
      height: 3.5rem;
      margin-top: -0.1rem;
      margin-right: 0.4rem;
    }
  }
`;

export const IconLink = styled(StyledLink)`
  margin: 1.2rem 0;
`;
