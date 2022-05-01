import { Button } from "@chakra-ui/button";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const DefaultButton = ({ children, onClick, ...rest }) => {
  const { themeMode, themeStyles } = useGlobalObjects();

  return (
    <Button
      colorScheme={themeMode === "light" ? "brand" : null}
      bgColor={themeStyles.colors.defaultButtonBg}
      padding="2rem 1.7rem"
      letterSpacing=".1rem"
      borderRadius="1rem"
      fontSize="1.6rem"
      type="submit"
      onClick={onClick}
      onSubmit={onClick}
      _hover={{ backgroundColor: "brand.400" }}
      {...rest}
    >
      {children}
    </Button>
  );
};
