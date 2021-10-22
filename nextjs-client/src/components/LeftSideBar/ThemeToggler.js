import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLink } from "./styled";

export const ThemeToggler = () => {
  const { themeMode, themeToggler } = useGlobalObjects();
  return (
    <IconLink onClick={themeToggler}>
      {themeMode === "light" ? (
        <FontAwesomeIcon icon={["fas", "moon"]} size="3x" color="white" />
      ) : (
        <FontAwesomeIcon icon={["fas", "sun"]} size="3x" color="white" />
      )}
    </IconLink>
  );
};
