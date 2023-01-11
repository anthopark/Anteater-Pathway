import { Box } from '@chakra-ui/layout';

interface Props {
  status: string;
  highlightedData: string;
  message: string;
}

function AppToast(props: Props) {
  return (
    <Box color="black" bg="gray.300">
      {`${props.highlightedData} ${props.message}`}
    </Box>
  );
}

export default AppToast;
