import Select, { ControlProps, OptionProps, StylesConfig } from 'react-select';

import { useEffect, useId, useState } from 'react';
import {
  borderRadiusSM,
  borderRadiusXS,
  controlHeightMD,
  dropdownBackgroundDark,
  dropdownBackgroundActiveDark,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray4,
  gray5,
  gray6,
  placeholderTextDark,
  placeholderText,
  white1,
  gray3,
  accentDark1,
  accentDark2,
} from '@styles/variables';
import { useTheme } from 'next-themes';

interface Props {
  customStyles?: StylesConfig;
  isClearable?: boolean;
  isOptionDisabled?: (option: any) => boolean;
  placeholder?: string;
  onChange?: (newValue: any) => void;
  options: any[];
}

function AppSingleSelect(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getControlBgColor = (state: ControlProps): string => {
    if (theme === 'light') {
      return white1;
    } else {
      return state.isFocused
        ? dropdownBackgroundActiveDark
        : dropdownBackgroundDark;
    }
  };

  const getOptionBgColor = (state: OptionProps): string => {
    if (state.isDisabled) {
      return 'none';
    } else {
      if (theme === 'dark' && state.isSelected) {
        return accentDark2;
      } else if (theme === 'light' && state.isSelected) {
        return gray5;
      } else {
        return 'none';
      }
    }
  };

  const getOptionHoverBgColor = (state: OptionProps): string => {
    if (state.isSelected) {
      return 'none';
    } else if (state.isDisabled) {
      return 'none';
    } else {
      return theme === 'dark' ? accentDark1 : gray6;
    }
  };

  const getOptionActiveBgColor = (state: OptionProps): string => {
    if (state.isSelected) {
      return theme === 'dark' ? accentDark2 : gray5;
    } else {
      return 'none';
    }
  };

  const baseStyles: StylesConfig<unknown, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: borderRadiusSM,
      border: theme === 'dark' ? `1px solid ${gray3}` : `1px solid ${gray5}`,

      backgroundColor: getControlBgColor(state),
      height: controlHeightMD,

      '&:hover': {
        borderColor: state.isFocused ? 'transparent' : gray4,
      },
    }),

    placeholder: (provided, state) => ({
      ...provided,
      fontSize: fontSizeMD,
      color: theme === 'dark' ? placeholderTextDark : placeholderText,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: fontSizeMD,
      color: 'defaultText',
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
      display: 'none',
    }),
    input: (provided) => ({
      ...provided,
      color: theme === 'dark' ? defaultTextDark : defaultText,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'dark' ? defaultTextDark : defaultText,
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: borderRadiusSM,
      border: theme === 'dark' ? `1px solid ${gray3}` : `1px solid ${gray5}`,
      backgroundColor: theme === 'dark' ? dropdownBackgroundActiveDark : white1,
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: '.6rem .4rem',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: fontSizeMD,
      padding: '.6rem 1rem',
      borderRadius: borderRadiusXS,
      backgroundColor: getOptionBgColor(state),
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      '&:hover': {
        backgroundColor: getOptionHoverBgColor(state),
      },
      '&:active': {
        backgroundColor: getOptionActiveBgColor(state),
      },
    }),

    noOptionsMessage: (provided) => ({
      ...provided,
      fontSize: fontSizeMD,
      color: placeholderText,
    }),
  };

  return (
    <>
      <Select
        defaultValue={null}
        // instanceId={useId()}
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
    </>
  );
}

export default AppSingleSelect;
