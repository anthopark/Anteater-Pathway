import { extendTheme } from "@chakra-ui/react";

export const lightTheme = {
  colors: {
    selectBorder: "transparent",
    leftSideBarBg: "#0E3D6B",
    pageBg: "#E5E5EF",
  },
};

export const darkTheme = {
  colors: {
    selectBorder: "red",
    leftSideBarBg: "#0E3D6B",
    pageBg: "#191930",
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
