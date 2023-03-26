import { useToast } from '@chakra-ui/react';
import AppToast from '@components/shared/AppToast/AppToast';

interface Props {
  status: 'success' | 'failure';
  highlightedData: string | null;
  message: string;
}
const useAppToast = () => {
  const toast = useToast();

  const showToastBox = (props: Props) => {
    toast({
      position: 'bottom-right',
      duration: props.status === 'success' ? 3500 : 4500,
      render: () => (
        <AppToast
          status={props.status}
          highlightedData={props.highlightedData}
          message={props.message}
        />
      ),
    });
  };

  return showToastBox;
};

export default useAppToast;
