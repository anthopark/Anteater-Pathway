import { useToast } from '@chakra-ui/react';
import AppToast from '@components/shared/AppToast/AppToast';

const useAppToast = () => {
  const toast = useToast();

  const showToastBox = () => {
    toast({
      position: 'bottom-right',
      duration: 3500,
      render: () => <AppToast />,
    });
  };

  return showToastBox;
};

export default useAppToast;
