import { extendTheme } from "@chakra-ui/react";

const PRIMARY_BRAND_COLOR = "#0C335A";
const MAIN_PAGE_BG_COLOR = "#E2E2EB";
const WHITE_DISPLAY_1 = "#f3f9ff";

export const lightTheme = {
  colors: {
    selectBorder: "transparent",
    leftSideBarBg: PRIMARY_BRAND_COLOR,
    defaultButtonBg: "brand.700",
    pinkButtonBg: "pink.500",
    pageBg: MAIN_PAGE_BG_COLOR,
    paneBg: WHITE_DISPLAY_1,
    modalBg: WHITE_DISPLAY_1,
    paneHeaderFont: "#7f7f7f",
    tentativeCourse: "#9BE7CB",
    courseItemShadow: "rgba(0,0,0, 0.2)",
    courseMenuBg: WHITE_DISPLAY_1,
    lightBorder: "#bbbbbb",
    defaultText: "#5C5C5C",
    redText: "#E34522",
    disabledText: "#cccccc",
    academicYearBg: WHITE_DISPLAY_1,
    quarterBoxBg: "#EFE9FA",
    emptyButton: "#aaaaaa",
    inputFormBorder: "#9f9f9f",
    inputFormBorderHover: "#0087cb",
    scrollbar: "#beccd0",
    scrollbarHover: "#909b9e",
  },
};

export const darkTheme = {
  colors: {
    selectBorder: "red",
    leftSideBarBg: "#0E3D6B",
    pageBg: "#191930",
    paneBg: "#FFFFFF",
    paneHeaderFont: "#7E7676",
    tentativeCourse: "#9BE7CB",
  },
};

export const chakraTheme = extendTheme({
  colors: {
    brand: {
      50: "#E8F2FC",
      100: "#C0DCF7",
      200: "#97C5F1",
      300: "#6FAEEC",
      400: "#4697E7",
      500: "#1E81E1",
      600: "#1867B4",
      700: "#124D87",
      800: "#0C335A",
      900: "#061A2D",
    },
  },
});
