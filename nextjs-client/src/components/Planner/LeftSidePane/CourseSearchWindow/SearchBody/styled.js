import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: oxygen;

  // Add a hover element
`;

export const resultScrollbar = styled.div`
  padding: 0rem 2rem 0 0;
  height: calc(100vh - 12rem);
  max-height: calc(100vh - 12rem);
  overflow-y: auto;
  overflow-x: hidden;

  .result-container {
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
  }
`;

const courseItemBorderRadius = "0.8rem";

export const CompactUIContainer = styled.div`
  width: 154.24px;
  height: 40px;
  border-radius: ${courseItemBorderRadius};
  display: flex;
  justify-content: center;
  background-color: #C4C4C4;
  color: white;
  align-items: center;
  font-size: 16px;
  font-family: oxygen;
  letter-spacing: 1px;

  .course-code-box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;

export const CourseInfoContainer = styled.div`
  height: 45px;
  border-radius: ${courseItemBorderRadius};
  display: flex;
  justify-content: center;
  font-family: oxygen;
  letter-spacing: 1px;
  display: flex;

  .course-data {
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-weight: bold;
  }

  .subtitle {
    color: #989898;
  }

  .more {
    margin-left: 17.5em;
    color: #989898;
  }
`;