import { extendTheme } from "@chakra-ui/react";

export const lightTheme = {
  colors: {
    selectBorder: "transparent",
    leftSideBarBg: "#0E3D6B",
    pageBg: "#E2E2EB",
    paneBg: "#f3f9ff",
    modalBg: "#f3f9ff",
    paneHeaderFont: "#7E7676",
    tentativeCourse: "#9BE7CB",
    courseItemShadow: "rgba(0,0,0, 0.2)",
    courseMenuBg: "#f3f9ff",
    lightBorder: "#bbbbbb",
    defaultText: "#5C5C5C",
    redText: "#E34522",
    disabledText: "#cccccc",
    academicYearBg: "#f3f9ff",
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
