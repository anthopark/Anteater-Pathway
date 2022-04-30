import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  width: 50rem;
`;

export const DepartmentSelect = styled(Select)`
  font-family: Oxygen;
  font-size: 1.6rem;
  .react-select__control {
    width: 20rem;
    height: 4.5rem;
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
