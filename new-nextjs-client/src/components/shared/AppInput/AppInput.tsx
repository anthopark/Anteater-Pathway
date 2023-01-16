import { Input } from '@chakra-ui/react';
import { selectBgColorDark } from '@styles/reusable-ui-variables';
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
} from '@styles/variables';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props {
  onChange?: (newValue: any) => void;
  value?: any;
}

function AppInput(props: Props) {
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
      bgColor={theme === 'light' ? white1 : selectBgColorDark}
      borderRadius={borderRadiusSM}
      color={theme === 'light' ? defaultText : defaultTextDark}
      fontSize={fontSizeMD}
      height={controlHeightMD}
      onChange={props.onChange}
      value={props.value}
      borderColor={theme === 'light' ? 'transparent' : gray3}
      _hover={{
        borderColor: gray4,
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
      }}
    />
  );
}

export default AppInput;
