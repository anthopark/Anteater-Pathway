import { useToast } from '@chakra-ui/react';
import AppToast from '@components/shared/AppToast/AppToast';

const useAppToast = () => {
  const toast = useToast();

  return () =>
    toast({
      position: 'bottom-right',
      duration: 3500,
      render: () => <AppToast />,
    });
};

export default useAppToast;
