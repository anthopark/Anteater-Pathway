import styled, { css, keyframes } from "styled-components";

const windowHeight = "40rem";

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
  animation: ${showcaseIn} 0.3s ease-out;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.searchWindowBg};
  display: flex;
  flex-direction: column;

  ${({ isSearchOpen }) =>
    isSearchOpen
      ? null
      : css`
          animation: ${showcaseOut} 0.2s ease-in;
          height: 0;
          visibility: hidden;
          margin-bottom: 0rem;
          padding: 0;
        `}

  .header {
    ${({ isSearchOpen }) =>
      isSearchOpen
        ? null
        : css`
            display: none;
          `}

    padding: 1rem 2rem;
    flex: 0 1 auto;
  }

  .body {
    flex: 1 1 auto;
  }

  .footer {
    flex: 0 1 4rem;
    border-top: 1px solid gray;
  }
`;
