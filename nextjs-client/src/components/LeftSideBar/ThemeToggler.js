import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconLink } from "./styled";

export const ThemeToggler = () => {
  const { themeMode, themeToggler } = useGlobalObjects();
  return (
    <IconLink onClick={themeToggler}>
      {themeMode === "light" ? (
        <FontAwesomeIcon icon={faMoon} size="3x" color="white" />
      ) : (
        <FontAwesomeIcon icon={faSun} size="3x" color="white" />
      )}
    </IconLink>
  );
};
