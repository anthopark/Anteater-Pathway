import Select, { ControlProps, OptionProps, StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import {
  borderRadiusSM,
  borderRadiusXS,
  controlHeightMD,
  defaultText,
  defaultTextDark,
  disabledText,
  disabledTextDark,
  fontSizeMD,
  gray3,
  gray4,
  gray5,
  gray6,
  placeholderTextDark,
  placeholderText,
  white1,
  blue2,
  accent1,
  gray2,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import {
  selectBgColorActiveDark,
  selectBgColorDark,
  selectOptionBgColorHoverDark,
  selectOptionBgColorSelectedDark,
} from '@styles/reusable-ui-variables';

interface Props {
  customStyles?: StylesConfig;
  isClearable?: boolean;
  isOptionDisabled?: (option: any) => boolean;
  placeholder?: string;
  onChange?: (newValue: any) => void;
  options: any[];
  value?: any;
}

function AppSingleSelect(props: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

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
      return state.isFocused ? selectBgColorActiveDark : selectBgColorDark;
    }
  };

  const getOptionBgColor = (state: OptionProps): string => {
    if (state.isDisabled) {
      return 'none';
    } else {
      if (theme === 'light' && state.isSelected) {
        return gray5;
      } else if (theme === 'dark' && state.isSelected) {
        return selectOptionBgColorSelectedDark;
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
      return theme === 'light' ? gray6 : selectOptionBgColorHoverDark;
    }
  };

  const getOptionActiveBgColor = (state: OptionProps): string => {
    if (state.isSelected) {
      return theme === 'light' ? gray5 : selectOptionBgColorSelectedDark;
    } else {
      return 'none';
    }
  };

  const getOptionFontColor = (state: OptionProps): string => {
    if (theme === 'light') {
      return state.isDisabled ? disabledText : defaultText;
    } else {
      return state.isDisabled ? disabledTextDark : defaultTextDark;
    }
  };

  const getControlBorderColor = (state: ControlProps): string => {
    if (state.menuIsOpen) {
      return theme === 'light' ? blue2 : accent1;
    }

    return theme === 'light' ? 'transparent' : gray3;
  };

  const getControlHoverBorderColor = (state: ControlProps): string => {
    if (state.menuIsOpen) {
      return theme === 'light' ? blue2 : accent1;
    }

    return theme === 'light' ? gray4 : gray4;
  };

  const getControlBoxShadow = (state: ControlProps): string => {
    if (state.menuIsOpen) {
      return theme === 'light'
        ? `0px 0px 0px 1px ${blue2}`
        : `0px 0px 0px 1px ${accent1}`;
    }

    return 'none';
  };

  const baseStyles: StylesConfig<unknown, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: borderRadiusSM,
      borderColor: getControlBorderColor(state),
      backgroundColor: getControlBgColor(state),
      boxShadow: getControlBoxShadow(state),
      height: controlHeightMD,

      '&:hover': {
        borderColor: getControlHoverBorderColor(state),
      },
    }),

    placeholder: (provided, state) => ({
      ...provided,
      fontSize: fontSizeMD,
      color: theme === 'light' ? placeholderText : placeholderTextDark,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: fontSizeMD,
      color: 'defaultText',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: gray4,
      paddingLeft: '0px',
      '&:hover': {
        color: theme === 'light' ? gray3 : gray5,
      },
    }),

    clearIndicator: (provided) => ({
      ...provided,
      color: gray4,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    // indicatorsContainer: (provided, props) => ({
    //   ...provided,
    //   padding: '8px 0',
    // }),

    input: (provided) => ({
      ...provided,
      color: theme === 'light' ? defaultText : defaultTextDark,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'light' ? defaultText : defaultTextDark,
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: borderRadiusSM,
      border: theme === 'light' ? `1px solid ${gray5}` : `1px solid ${gray3}`,
      backgroundColor: theme === 'light' ? white1 : selectBgColorActiveDark,
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: '.6rem .4rem',
    }),
    option: (provided, state) => ({
      ...provided,
      color: getOptionFontColor(state),
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
        isClearable={props.isClearable}
        isMulti={false}
        isOptionDisabled={props.isOptionDisabled}
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder}
        value={props.value}
        styles={{
          ...baseStyles,
          ...props.customStyles,
        }}
      />
    </>
  );
}

export default AppSingleSelect;
