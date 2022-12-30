import Select, { StylesConfig } from 'react-select';
import { useId } from 'react';
import {
  borderRadiusSM,
  borderRadiusXS,
  controlHeightMD,
  defaultText,
  fontSizeMD,
  gray3,
  gray4,
  gray5,
  gray6,
  placeholderText,
  disabledText,
  white1,
} from '@styles/variables';

const baseStyles: StylesConfig<unknown, false> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: borderRadiusSM,
    borderColor: white1,
    height: controlHeightMD,
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
    color: state.isDisabled ? disabledText : defaultText,
    padding: '.6rem 1rem',
    borderRadius: borderRadiusXS,
    // backgroundColor: state.isSelected ? gray5 : white1,
    // '&:hover': {
    //   backgroundColor: state.isSelected ? gray5 : gray6,
    // },
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
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: gray3,
          primary75: gray4,
          primary50: gray5,
          primary25: gray6,
        },
      })}
    />
  );
}

export default AppSingleSelect;
