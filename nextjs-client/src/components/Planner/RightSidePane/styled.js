import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  min-height: 10rem;
  background-color: ${({ theme }) => theme.colors.paneBg};
  border-radius: 15px;
  transition: all 0.3s;
  box-shadow: 0 1px 6px rgba(100, 100, 100, 0.1);
`;

export const TentativePlannerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: oxygen;
  max-height: 40rem;
  overflow: hidden;
  padding: 0.2rem 0.7rem;

  .header {
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    padding-top: 1rem;
    padding-left: 1.6rem;
    color: ${({ theme }) => theme.colors.paneHeaderFont};
  }

  .content {
    margin-top: 1rem;
    margin-bottom: 1.7rem;
    width: 100%;
    padding: 0 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    overflow-x: hidden;

    .course-list {
      padding: 0 0.2rem;
      min-height: 4rem;
      .course-item-wrapper {
        padding: 0.3rem;
      }
    }
  }
`;
