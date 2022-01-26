import { useEffect } from "react";
import { CustomCourseControl } from "./CustomCourseControl/CustomCourseControl";
import AcademicYearControl from "./AcademicYearControl";
import { CourseSearchBar } from "./CourseSearchBar/CourseSearchBar";
import { UserProfile } from "./UserProfile/UserProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { DragDropContextProvider } from "./DragDropContextProvider";
import { auth } from "src/firebase/firebase-config";
import RightSidePane from "./RightSidePane";
import LeftSidePane from "./LeftSidePane";
import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { useSignIn } from "src/hooks/useSignIn";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useToastBox } from "src/hooks/useToastBox";

export const Planner = () => {
  const { appUser } = useGlobalObjects();
  const [firebaseAuthUser, loading, error] = useAuthState(auth);
  const { signInToBackend } = useSignIn();
  const { showToastBox } = useToastBox();

  useEffect(() => {
    const handleSignIn = async () => {
      console.log("isAuth", appUser.isAuthenticated);

      if (firebaseAuthUser && appUser.isAuthenticated === false) {
        await signInToBackend(
          firebaseAuthUser.uid,
          firebaseAuthUser.accessToken
        );
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
  }, [firebaseAuthUser]);

  return (
    <StyledContainer>
      <TopLayout>
        <AcademicYearControl />
        <CourseSearchBar />
        <div className="right-end-box">
          {firebaseAuthUser ? <CustomCourseControl /> : null}
          <UserProfile user={firebaseAuthUser} />
        </div>
      </TopLayout>
      <DragDropContextProvider>
        <MainLayout>
          <div className="left-pane">
            <LeftSidePane />
          </div>
          <div className="right-pane">
            <RightSidePane />
          </div>
        </MainLayout>
      </DragDropContextProvider>
    </StyledContainer>
  );
};
