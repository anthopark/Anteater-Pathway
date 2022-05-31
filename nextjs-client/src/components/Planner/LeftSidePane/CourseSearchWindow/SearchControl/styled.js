import styled from "styled-components";
import Select from "react-select";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DepartmentSelect = styled(Select)`
  font-family: Oxygen;
  font-size: 1.6rem;
  .react-select__control {
    width: 299px;
    height: 46px;
    background: #e9e9e9;
    // can control position here
    // Make sure to change any directional in select__menu
    right: 1.2em;

    border: ${({ theme }) => theme.colors.inputFormBorder};
    border-radius: 10px;
    &:hover {
      border: ${({ theme }) => theme.colors.inputFormBorderHover};
    }
  }

  .react-select {
    padding-left: 2em;
  }

  // selected value in control
  .react-select__single-value {
  }

  .react-select__placeholder {
    color: #5c5c5c;
    letter-spacing: 0.1rem;
    font-size: 19px;
    padding-bottom: 0.2rem;
  }

  .react-select__input {
  }

  // changes dropdown menu curvature
  .react-select__menu {
    right: 1.2em;
    border-radius: 10px;
  }

  .react-select__option {
    letter-spacing: 1px;
  }
`;

export const lineSpec = styled.div`
  right: 20em;
`;

export const RemoveBox1 = styled.div`
  display: flex;
  align-items: center;
`;