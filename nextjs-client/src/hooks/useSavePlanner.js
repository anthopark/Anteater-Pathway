import { saveEntirePlanner } from "src/api/planner";
import { useToastBox } from "./useToastBox";

export const useSavePlanner = () => {
  const { showToastBox } = useToastBox();

  const savePlannerToBackend = (appUser) => {
    if (appUser.isAuthenticated) {
      saveEntirePlanner(appUser)
        .then()
        .catch(() => {
          showToastBox({
            status: "failure",
            dataOfInterest: ["SERVER ERROR"],
            message: "Failed to save planner",
          });
        });
    }
  };

  return {
    savePlannerToBackend,
  };
};
