import Select, { StylesConfig } from 'react-select';
import { useId } from 'react';
import {
  borderRadiusSM,
  borderRadiusXS,
  controlHeightMD,
  defaultText,
  fontSizeMD,
  gray5,
  gray6,
  gray7,
  placeholderText,
  white1,
} from '@styles/variables';

const baseStyles: StylesConfig<unknown, false> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: borderRadiusSM,
    borderColor: white1,
    height: controlHeightMD,
    '&:hover': {
      borderColor: state.isFocused ? 'transparent' : gray5,
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
    color: gray5,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: gray5,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: gray5,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: borderRadiusSM,
    border: `1px solid ${gray6}`,
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
    backgroundColor: state.isSelected ? gray6 : white1,
    '&:hover': {
      backgroundColor: state.isSelected ? gray6 : gray7,
    },
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: fontSizeMD,
    color: placeholderText,
  }),
};

interface Props {
  customStyles?: StylesConfig;
  isClearable?: boolean;
  isOptionDisabled?: (option: any) => boolean;
  placeholder?: string;
  onChange?: (newValue: any) => void;
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
