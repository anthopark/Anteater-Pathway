import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.form`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  padding-right: 2rem;
`;

export const StyledReactSelect = styled(Select)`
  font-family: Oxygen;
  font-size: 1.6rem;
  padding-top: 0.4rem;

  .react-select__control {
    width: 14rem;
    height: 4rem;
    border: 1px solid ${({ theme }) => theme.colors.inputFormBorder};
    border-radius: 10px;
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.inputFormBorderHover};
    }
  }

  // selected value in control
  .react-select__single-value {
  }

  .react-select__placeholder {
    letter-spacing: 0.1rem;
    font-size: 1.4rem;
  }

  .react-select__input {
  }

  .react-select__menu {
    border-radius: 10px;
  }

  .react-select__option {
    letter-spacing: 1px;
  }
`;
