import { useGlobalValues } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconLink } from "./styled";

export const ThemeToggler = () => {
  const { theme, themeToggler } = useGlobalValues();
  return (
    <IconLink onClick={themeToggler}>
      {theme === "light" ? (
        <FontAwesomeIcon icon={faMoon} size="3x" color="white" />
      ) : (
        <FontAwesomeIcon icon={faSun} size="3x" color="white" />
      )}
    </IconLink>
  );
};
