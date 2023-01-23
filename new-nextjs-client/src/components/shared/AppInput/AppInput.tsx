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
  gray5,
  gray2,
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props {
  onChange?: (newValue: any) => void;
  value?: any;
  placeholder: string;
}

function AppInput(props: Props) {
  const { onChange, value, ...rest } = props;
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Input
      autoComplete="off"
      bgColor={theme === 'light' ? white1 : inputBgColorDark}
      borderRadius={borderRadiusSM}
      color={theme === 'light' ? defaultText : defaultTextDark}
      _placeholder={{
        color: theme === 'light' ? placeholderText : placeholderTextDark,
      }}
      fontSize={fontSizeMD}
      height={controlHeightMD}
      onChange={onChange}
      value={value}
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
      {...rest}
    />
  );
}

export default AppInput;
