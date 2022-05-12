import { useEffect, useState } from "react";
import { CustomCourseControl } from "./CustomCourseControl/CustomCourseControl";
import AcademicYearControl from "./AcademicYearControl";
import { UserProfile } from "./UserProfile/UserProfile";
import SearchButtonSwitch from "./SearchButtonSwitch";
import { useAuthState } from "react-firebase-hooks/auth";
import { DragDropContextProvider } from "./DragDropContextProvider";
import { auth } from "src/firebase/firebase-config";
import RightSidePane from "./RightSidePane";
import LeftSidePane from "./LeftSidePane";
import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { useSignIn } from "src/hooks/useSignIn";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useToastBox } from "src/hooks/useToastBox";

const UPDATE_TOKEN_INTERVAL_MINUTE = 1;

export const Planner = () => {
  const { appUser, updateAppUser } = useGlobalObjects();
  const [firebaseAuthUser, loading, error] = useAuthState(auth);
  const { signInToBackend } = useSignIn();
  const { showToastBox } = useToastBox();
  // If search planner expands the state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    let tokenInterval = null;

    const handleSignIn = async () => {
      if (firebaseAuthUser && appUser.isAuthenticated === false) {
        await signInToBackend(
          firebaseAuthUser.uid,
          firebaseAuthUser.accessToken
        );

        tokenInterval = setInterval(async () => {
          firebaseAuthUser
            .getIdToken()
            .then((token) => {
              if (token !== appUser.accessToken) {
                appUser.accessToken = token;
                updateAppUser(appUser);
                firebaseAuthUser.reload();
              }
            })
            .catch(() => {});
        }, 1000 * 60 * UPDATE_TOKEN_INTERVAL_MINUTE);
      }

      if (!loading && error) {
        showToastBox({
          status: "failure",
          dataOfInterest: [],
          message: "Authentication has failed",
        });
      }
    };

    handleSignIn();

    return () => clearInterval(tokenInterval);
  }, [firebaseAuthUser]);

  return (
    <StyledContainer>
      <TopLayout>
        <div className="left-end-box">
          <AcademicYearControl />
          <SearchButtonSwitch
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        </div>
        <div className="right-end-box">
          {firebaseAuthUser ? <CustomCourseControl /> : null}
          <UserProfile user={firebaseAuthUser} />
        </div>
      </TopLayout>
      <MainLayout>
        <DragDropContextProvider>
          <div className="left-pane">
            <LeftSidePane
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          </div>
          <div className="right-pane">
            <RightSidePane />
          </div>
        </DragDropContextProvider>
      </MainLayout>
    </StyledContainer>
  );
};
