import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

function AppToast() {
  const toast = useToast();

  return (
    <Box color="black" bg="gray.300">
      App Toast
    </Box>
  );
}

export default AppToast;
