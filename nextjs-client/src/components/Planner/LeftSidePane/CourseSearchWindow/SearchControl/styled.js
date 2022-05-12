import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 68rem;
`;

export const DepartmentSelect = styled(Select)`
  font-family: Oxygen;
  font-size: 1.6rem;
  .react-select__control {
    width: 299px;
    height: 4rem;
    background: #E9E9E9;
    // can control position here
    right: 1.2em;
    border: ${({ theme }) => theme.colors.inputFormBorder};
    border-radius: 10px;
    &:hover {
      border: ${({ theme }) => theme.colors.inputFormBorderHover};
    }
  }
  
  .react-select{
    padding-left: 2em;

  }

  // selected value in control
  .react-select__single-value {

  }

  .react-select__placeholder {
    color: #5C5C5C;
    letter-spacing: 0.1rem;
    font-size: 1.4rem;
    padding-bottom: 0.2rem;
  }

  .react-select__input {
  }

  // changes dropdown menu curvature
  .react-select__menu {
    border-radius: 10px;
  }

  .react-select__option {
    letter-spacing: 1px;
  }
`;