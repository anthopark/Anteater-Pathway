import { useGlobalObjects } from "@components/GlobalContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "src/firebase/firebase-config";

export const useSignOut = () => {
  const { appUser, updateAppUser } = useGlobalObjects();

  const signOutFromFirebase = async () => {
    await signOut(auth);
    appUser.isAuthenticated = false;
    updateAppUser(appUser);
  };

  return {
    signOutFromFirebase,
  };
};
