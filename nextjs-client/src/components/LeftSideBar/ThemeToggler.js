import { useContext } from "react";
import { GlobalContext } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconLink } from "./styled";

export const ThemeToggler = () => {
  const { theme, themeToggler } = useContext(GlobalContext);
  return (
    <IconLink onClick={themeToggler}>
      {theme === "light" ? (
        <FontAwesomeIcon icon={faMoon} size="4x" color="white" />
      ) : (
        <FontAwesomeIcon icon={faSun} size="4x" color="white" />
      )}
    </IconLink>
  );
};
