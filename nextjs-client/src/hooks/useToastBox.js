import { ToastBox } from "@components/CustomChakraUI";
import { useToast } from "@chakra-ui/toast";

export const useToastBox = () => {
  const toast = useToast();

  return {
    showToastBox: ({ status, dataOfInterest, message }) => {
      toast({
        position: "bottom-right",
        duration: 3000,
        render: () => (
          <ToastBox
            status={status}
            dataOfInterest={dataOfInterest}
            message={message}
          />
        ),
      });
    },
  };
};
