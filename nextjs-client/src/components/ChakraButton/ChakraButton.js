import { Button } from "@chakra-ui/button";

export const ChakraButton = ({ children, onClick, ...rest }) => {
  return (
    <Button
      letterSpacing=".1rem"
      padding="2.1rem 1.6rem"
      colorScheme="brand"
      backgroundColor="brand.700"
      borderRadius="1rem"
      fontSize="1.6rem"
      type="submit"
      onClick={onClick}
      onSubmit={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};
