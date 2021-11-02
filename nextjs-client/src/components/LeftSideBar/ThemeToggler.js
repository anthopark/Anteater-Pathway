import { useGlobalObjects } from "@components/GlobalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLink } from "./styled";

export const ThemeToggler = ({ iconSize }) => {
  const { themeMode, themeToggler } = useGlobalObjects();
  return (
    <IconLink onClick={themeToggler}>
      {themeMode === "light" ? (
        <FontAwesomeIcon
          icon={["fas", "moon"]}
          style={{ fontSize: iconSize }}
          color="white"
        />
      ) : (
        <FontAwesomeIcon
          icon={["fas", "sun"]}
          style={{ fontSize: iconSize }}
          color="white"
        />
      )}
    </IconLink>
  );
};
