import Select, { StylesConfig } from 'react-select';
import { useId } from 'react';
import {
  borderRadiusSM,
  borderRadiusXS,
  controlHeight,
  defaultText,
  fontSizeMD,
  gray4,
  gray5,
  gray6,
  placeholderText,
} from '@styles/variables';

const baseStyles: StylesConfig<unknown, false> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: borderRadiusSM,
    borderColor: 'white',
    height: controlHeight,
    '&:hover': {
      borderColor: state.isFocused ? 'transparent' : gray4,
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: fontSizeMD,
    color: placeholderText,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    fontSize: fontSizeMD,
    color: defaultText,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: gray4,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: gray4,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: gray4,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: borderRadiusSM,
    border: `1px solid ${gray5}`,
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: '.6rem .4rem',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: fontSizeMD,
    color: defaultText,
    padding: '.6rem 1rem',
    borderRadius: borderRadiusXS,
    backgroundColor: state.isSelected ? gray5 : 'white',
    '&:hover': {
      backgroundColor: state.isSelected ? gray5 : gray6,
    },
  }),
};

interface Props {
  customStyles?: StylesConfig;
  isClearable?: boolean;
  isOptionDisabled?: (option: unknown) => boolean;
  placeholder?: string;
  onChange?: (newValue: unknown) => void;
  options: any[];
}

function AppSingleSelect(props: Props) {
  return (
    <Select
      defaultValue={null}
      instanceId={useId()}
      isClearable={props.isClearable}
      isMulti={false}
      isOptionDisabled={props.isOptionDisabled}
      onChange={props.onChange}
      options={props.options}
      placeholder={props.placeholder}
      styles={{
        ...baseStyles,
        ...props.customStyles,
      }}
    />
  );
}

export default AppSingleSelect;
