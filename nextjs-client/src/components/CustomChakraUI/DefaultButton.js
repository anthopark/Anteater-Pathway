import { Button } from "@chakra-ui/button";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const DefaultButton = ({ children, onClick, ...rest }) => {
  const { themeMode, themeStyles } = useGlobalObjects();

  return (
    <Button
      colorScheme={themeMode === "light" ? "brand" : null}
      bgColor={themeStyles.colors.defaultButtonBg}
      padding="2.1rem 1.6rem"
      letterSpacing=".1rem"
      borderRadius="1rem"
      fontSize="1.7rem"
      type="submit"
      onClick={onClick}
      onSubmit={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};
