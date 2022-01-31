import { signInUser } from "src/api/user";
import { useToastBox } from "./useToastBox";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useSignOut } from "./useSignOut";
import { useSavePlanner } from "./useSavePlanner";

export const useSignIn = () => {
  const { showToastBox } = useToastBox();
  const { appUser, updateAppUser } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();
  const { signOutFromFirebase } = useSignOut();

  const signInToBackend = async (uid, accessToken) => {
    return signInUser(uid, accessToken)
      .then((result) => {
        showToastBox({
          status: "success",
          dataOfInterest: [],
          message: "Signed in successfully",
        });

        appUser.uid = uid;
        appUser.isAuthenticated = true;
        appUser.accessToken = accessToken;
        updateAppUser(appUser);

        if (result.isNewUser) {
          // upload current planner to the backend
          savePlannerToBackend(appUser);
        } else {
          // download exisiting planner to the client
        }
      })
      .catch((error) => {
        console.log(error);
        signOutFromFirebase();
        showToastBox({
          status: "failure",
          dataOfInterest: ["Server Error"],
          message: "Failed to authenticate with the server",
        });
      });
  };

  return {
    signInToBackend,
  };
};
