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

export const ResultScrollbar = styled.div`
  padding: 0rem 2rem 0 0;

  .result-container {
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    padding: 0 1.2rem;
    display: grid;
    width: 30rem;
    grid-template-columns: 1fr 1fr;
    max-height: 36rem;
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

  .boxy {
    margin-top: 3rem;
    margin-right: 3rem;
    left: -3rem;
  }
`;

const courseItemBorderRadius = "0.8rem";

export const CompactUIContainer = styled.div`
  width: 125px;
  height: 40px;
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: ${courseItemBorderRadius};
  display: flex;
  justify-content: center;
  background-color: #003358;
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
