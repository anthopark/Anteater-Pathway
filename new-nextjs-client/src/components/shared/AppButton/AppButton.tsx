import style from './AppButton.module.scss';
import classNames from 'classnames/bind';
import { Button } from '@chakra-ui/react';
import {
  useState,
  useEffect,
  ReactElement,
  ReactNode,
  MouseEvent,
} from 'react';
import { useTheme } from 'next-themes';
import {
  accent1,
  accent2,
  accent3,
  borderRadiusSM,
  controlHeightMD,
  fontSizeMD,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5,
  gray6,
  gray7,
  primary1,
  primary2,
  red1,
  red2,
  red3,
  red4,
  white1,
} from '@styles/variables';

interface ColorMap {
  [key: string]: { [key: string]: string | null };
}

const primaryBgColorMap: ColorMap = {
  default: {
    light: primary1,
    dark: accent1,
  },
  hover: {
    light: primary2,
    dark: accent2,
  },
  active: {
    light: primary1,
    dark: accent1,
  },
};

const secondaryBgColorMap: ColorMap = {
  default: {
    light: gray5,
    dark: gray2,
  },
  hover: {
    light: gray4,
    dark: gray3,
  },
  active: {
    light: gray5,
    dark: gray2,
  },
};

const dangerBgColorMap: ColorMap = {
  default: {
    light: red3,
    dark: gray2,
  },
  hover: {
    light: red4,
    dark: red2,
  },
  active: {
    light: red3,
    dark: red1,
  },
};

const primaryFontColorMap: ColorMap = {
  default: {
    light: white1,
    dark: gray6,
  },
  hover: {
    light: white1,
    dark: gray6,
  },
  active: {
    light: white1,
    dark: gray6,
  },
};

const secondaryFontColorMap: ColorMap = {
  default: {
    light: gray1,
    dark: gray5,
  },
  hover: {
    light: gray1,
    dark: gray5,
  },
  active: {
    light: gray1,
    dark: gray5,
  },
};

const dangerFontColorMap: ColorMap = {
  default: {
    light: white1,
    dark: red3,
  },
  hover: {
    light: white1,
    dark: gray6,
  },
  active: {
    light: white1,
    dark: gray7,
  },
};

const primaryBorderColorMap: ColorMap = {
  default: {
    light: null,
    dark: accent3,
  },
  hover: {
    light: null,
    dark: accent3,
  },
  active: {
    light: null,
    dark: accent3,
  },
};

const secondaryBorderColorMap: ColorMap = {
  default: {
    light: null,
    dark: gray3,
  },
  hover: {
    light: null,
    dark: gray5,
  },
  active: {
    light: null,
    dark: gray3,
  },
};

const dangerBorderColorMap: ColorMap = {
  default: {
    light: null,
    dark: red3,
  },
  hover: {
    light: null,
    dark: red3,
  },
  active: {
    light: null,
    dark: red3,
  },
};

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  kind: 'primary' | 'secondary' | 'danger';
  leftIcon?: ReactElement;
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
  rightIcon?: ReactElement;
}

function AppButton({
  children,
  isDisabled,
  kind,
  leftIcon,
  onClick,
  rightIcon,
  ...rest
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBgColor = (useCase: 'default' | 'hover' | 'active'): string => {
    let color: string;

    switch (kind) {
      case 'primary':
        color = primaryBgColorMap[useCase][theme!]!;
        break;
      case 'secondary':
        color = secondaryBgColorMap[useCase][theme!]!;
        break;
      case 'danger':
        color = dangerBgColorMap[useCase][theme!]!;
        break;
    }

    return color;
  };

  const getFontColor = (useCase: 'default' | 'hover' | 'active'): string => {
    let color: string;

    switch (kind) {
      case 'primary':
        color = primaryFontColorMap[useCase][theme!]!;
        break;
      case 'secondary':
        color = secondaryFontColorMap[useCase][theme!]!;
        break;
      case 'danger':
        color = dangerFontColorMap[useCase][theme!]!;
        break;
    }

    return color;
  };

  const getBorderColor = (
    useCase: 'default' | 'hover' | 'active'
  ): string | undefined => {
    let color: string | undefined;

    switch (kind) {
      case 'primary':
        color = primaryBorderColorMap[useCase][theme!] ?? undefined;
        break;
      case 'secondary':
        color = secondaryBorderColorMap[useCase][theme!] ?? undefined;
        break;
      case 'danger':
        color = dangerBorderColorMap[useCase][theme!] ?? undefined;
        break;
    }

    return color;
  };

  if (!mounted) {
    return null;
  }

  const cx = classNames.bind(style);

  return (
    <div
      className={cx('container', {
        disabled: isDisabled,
      })}
    >
      <Button
        bgColor={getBgColor('default')}
        borderColor={getBorderColor('default')}
        borderWidth={
          getBorderColor('default') !== undefined ? '1px' : undefined
        }
        borderRadius={borderRadiusSM}
        color={getFontColor('default')}
        fontSize={fontSizeMD}
        fontWeight={500}
        height={controlHeightMD}
        leftIcon={leftIcon}
        letterSpacing={'0.5px'}
        onClick={onClick}
        padding={'0 1.2rem'}
        rightIcon={rightIcon}
        _hover={{
          bgColor: getBgColor('hover'),
          borderColor: getBorderColor('hover'),
          color: getFontColor('hover'),
        }}
        _active={{
          bgColor: getBgColor('active'),
          borderColor: getBorderColor('active'),
          color: getFontColor('active'),
        }}
        style={
          isDisabled
            ? {
                opacity: 0.4,
                pointerEvents: 'none',
              }
            : undefined
        }
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
}

export default AppButton;
