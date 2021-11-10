import styled from "styled-components";

const bgColors = {
  green: "#64ecbb",
};

const fontColors = {
  green: "#5C5C5C",
};

export const TentativeContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  color: ${({ bgColor }) => fontColors[bgColor]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-family: oxygen;
  font-size: 1.3rem;
  letter-spacing: 1px;

  .course-code-box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    max-width: 13.8rem;
  }
`;

export const RegularContainer = styled.div``;
