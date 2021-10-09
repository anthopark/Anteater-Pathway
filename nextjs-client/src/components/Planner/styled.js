import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.pageBg};
  transition: background-color 0.4s linear;
`;

export const TopLayout = styled.div`
  width: 100%;
  height: 10rem;
  display: grid;
  grid-template-columns: auto 30rem;

  .left-pane {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-pane {
    background-color: lightcoral;
  }
`;

export const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 30rem;
  background-color: lime;

  .left-pane {
    background-color: lightseagreen;
  }

  .right-pane {
  }
`;

export const AddSchoolYearContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28rem;
  height: 100%;
  padding: 0 2rem;
  background-color: khaki;
`;

export const StyledReactSelect = styled(Select)`
  .react-select__control {
    width: 17rem;
    height: 4rem;
    font-size: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.selectBorder};
    color: red;
  }

  // selected value in control
  .react-select__single-value {
    padding-top: 0.4rem;
  }

  .react-select__placeholder {
    padding-top: 0.4rem;
  }

  .react-select__input {
  }

  .react-select__menu {
    font-size: 1.6rem;
  }

  .react-select__option {
    font-size: 1.6rem;
  }
`;
