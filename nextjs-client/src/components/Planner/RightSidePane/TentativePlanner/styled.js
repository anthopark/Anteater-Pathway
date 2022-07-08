import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: oxygen;
  max-height: 40rem;
  overflow: hidden;
  padding: 0.2rem 0.7rem;

  .header {
    padding: 0.9rem 1.3rem 0 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 0.1rem;
    .title {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.paneHeaderFont};
    }

    .clear-all-box {
      padding-top: 0.2rem;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 0.3rem;
      color: ${({ theme }) => theme.colors.emptyButton};
      transition: color 200ms ease-in-out;
    }

    .clear-all-box:hover {
      color: ${({ theme }) => theme.colors.courseEmptyButtonHover};
    }
  }

  .content {
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    width: 100%;
    padding: 0 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbar};
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.scrollbarHover};
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    .course-list {
      padding: 0 0.2rem;
      min-height: 4rem;
      .course-item-wrapper {
        padding: 0.3rem;
      }
    }
  }

  .footer {
    color: ${({ theme }) => theme.colors.paneHeaderFont};
    width: 100%;
    text-align: right;
    font-size: 1.4rem;
    letter-spacing: 1px;
    padding: 0 1.2rem 1rem;
    margin-top: -0.5rem;
  }
`;
