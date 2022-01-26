import { signInUser } from "src/api/user";
import { useToastBox } from "./useToastBox";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useSignOut } from "./useSignOut";

export const useSignIn = () => {
  const { showToastBox } = useToastBox();
  const { appUser, updateAppUser } = useGlobalObjects();
  const { signOutFromFirebase } = useSignOut();

  const signInToBackend = async (uid, accessToken) => {
    let signInResponse;
    try {
      signInResponse = await signInUser(uid, accessToken);
    } catch (e) {
      showToastBox({
        status: "failure",
        dataOfInterest: ["Server Error"],
        message: "Failed to authenticate with the server.",
      });
      await signOutFromFirebase();
      return false;
    }

    showToastBox({
      status: "success",
      dataOfInterest: [],
      message: "Signed in successfully",
    });

    appUser.isAuthenticated = true;
    updateAppUser(appUser);

    if (signInResponse.isNewUser) {
      // upload current planner to the backend
    } else {
      // download exisiting planner to the client
    }

    return true;
  };

  return {
    signInToBackend,
  };
};
