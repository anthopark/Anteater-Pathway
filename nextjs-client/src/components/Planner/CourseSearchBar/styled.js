import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
`;

export const StyledReactSelect = styled(Select)`
  font-family: Oxygen;
  font-size: 1.6rem;
  padding-top: 0.4rem;

  .react-select__control {
    width: 36rem;
    min-height: 4.5rem;
    border: 1px solid ${({ theme }) => theme.colors.selectBorder};
    border-radius: 10px;
  }

  // selected value in control
  .react-select__single-value {
    /* padding-top: 0.4rem; */
  }

  .react-select__placeholder {
    /* padding-top: 0.4rem; */
    letter-spacing: 0.1rem;
  }

  .react-select__input {
  }

  .react-select__menu {
    border-radius: 10px;
    padding: 0.5rem;
  }

  .react-select__option {
    border-radius: 5px;
  }
`;

export const CustomOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  letter-spacing: 0.1rem;

  .option-top {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;

    .course-info {
      display: flex;
      font-weight: bold;

      .number {
        margin-left: 1rem;
      }
    }

    .course-unit {
      margin-right: 0.7rem;
    }
  }

  .option-bottom {
    font-size: 1.4rem;
    font-weight: lighter;

    .course-title {
      font-style: italic;
      padding: 0.1rem 0.3rem;
      margin-right: 1rem;
    }
  }
`;
