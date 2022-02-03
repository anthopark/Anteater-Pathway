import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [themeMode, setTheme] = useState("light");
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
    setIsComponentMounted(true);
  }, []);

  return { themeMode, themeToggler, isComponentMounted };
};
