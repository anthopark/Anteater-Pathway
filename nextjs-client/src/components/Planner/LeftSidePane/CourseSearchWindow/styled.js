import styled, { css, keyframes } from "styled-components";

const windowHeight = "35rem";

const showcaseIn = keyframes`
    0% {
        height: 0%;
    }

    100% {
        height: ${windowHeight};
    }
`;

const showcaseOut = keyframes`
    0% {
        height: ${windowHeight};
    }

    100% {
        height: 0%;
    }
`;

export const StyledContainer = styled.div`
  width: 100%;
  height: ${windowHeight};
  animation: ${showcaseIn} 0.2s ease-out;
  background-color: lightgreen;
  margin-bottom: 2rem;
  border-radius: 12px;
  ${({ isSearchOpen }) =>
    isSearchOpen
      ? null
      : css`
          animation: ${showcaseOut} 0.2s ease-in;
          height: 0;
          visibility: hidden;
          margin-bottom: 0rem;
        `}
`;
