import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
  colors: {
    brandLight: {
      '50': '#ECF1F9',
      '100': '#C9D8ED',
      '200': '#A7BEE2',
      '300': '#84A5D7',
      '400': '#618CCB',
      '500': '#3F73C0',
      '600': '#325C9A',
      '700': '#264573',
      '800': '#192E4D',
      '900': '#0D1726',
    },
    brandDark: {
      '50': '#FCF3E9',
      '100': '#F6DEC0',
      '200': '#F1C898',
      '300': '#EBB36F',
      '400': '#E69D47',
      '500': '#E0881F',
      '600': '#B36D19',
      '700': '#875112',
      '800': '#5A360C',
      '900': '#2D1B06',
    },
  },
});
