import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.form`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
`;

export const StyledReactSelect = styled(Select)`
  .react-select__control {
    width: 14rem;
    height: 4.5rem;
    font-size: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.selectBorder};
    border-radius: 10px;
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
    border-radius: 10px;
  }

  .react-select__option {
    font-size: 1.6rem;
  }
`;
