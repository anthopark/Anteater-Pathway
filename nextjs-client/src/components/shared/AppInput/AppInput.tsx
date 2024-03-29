import { Input } from '@chakra-ui/react';
import {
  inputBgColorActiveDark,
  inputBgColorDark,
} from '@styles/reusable-ui-variables';
import {
  borderRadiusSM,
  controlHeightMD,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray3,
  gray4,
  white1,
  blue2,
  accent1,
  placeholderText,
  placeholderTextDark,
  gray2,
  letterSpacingSM,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { CSSProperties, forwardRef, useEffect, useState } from 'react';

interface Props {
  id?: string;
  placeholder?: string;
  onChange?: (newValue: any) => void;
  style?: CSSProperties;
  type?: string | 'number';
  value?: any;
}

const AppInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { id, placeholder, onChange, style, type, value, ...rest } = props;

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    // @ts-ignore
    <Input
      ref={ref}
      id={props.id}
      autoComplete="off"
      bgColor={theme === 'light' ? white1 : inputBgColorDark}
      borderRadius={borderRadiusSM}
      color={theme === 'light' ? defaultText : defaultTextDark}
      _placeholder={{
        color: theme === 'light' ? placeholderText : placeholderTextDark,
      }}
      fontSize={fontSizeMD}
      height={controlHeightMD}
      placeholder={props.placeholder}
      letterSpacing={letterSpacingSM}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      borderColor={theme === 'light' ? gray4 : gray3}
      _hover={{
        borderColor: theme === 'light' ? gray2 : gray4,
      }}
      _active={{
        borderColor: theme === 'light' ? blue2 : accent1,
        boxShadow:
          theme === 'light'
            ? `0px 0px 0px 1px ${blue2}`
            : `0px 0px 0px 1px ${accent1}`,
      }}
      _focus={{
        borderColor: theme === 'light' ? blue2 : accent1,
        boxShadow:
          theme === 'light'
            ? `0px 0px 0px 1px ${blue2}`
            : `0px 0px 0px 1px ${accent1}`,
        backgroundColor: theme === 'light' ? white1 : inputBgColorActiveDark,
      }}
      {...props.style}
      {...rest}
    />
  );
});

export default AppInput;
