import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { CustomCourseControl } from "./CustomCourseControl/CustomCourseControl";
import AcademicYearControl from "./AcademicYearControl";
import { CourseSearchBar } from "./CourseSearchBar/CourseSearchBar";
import { UserProfile } from "./UserProfile/UserProfile";
import { RightSidePane } from "./RightSidePane/RightSidePane";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/client-app";
import { DragDropContextProvider } from "./DragDropContextProvider";

export const Planner = () => {
  const [user, loading] = useAuthState(firebase.auth());

  console.log(`Loading: ${loading} | Current user: ${user}`);
  console.log(user);

  return (
    <StyledContainer>
      <TopLayout>
        <AcademicYearControl />
        <CourseSearchBar />
        <div className="right-end-box">
          {user ? <CustomCourseControl /> : null}
          <UserProfile user={user} />
        </div>
      </TopLayout>
      <DragDropContextProvider>
        <MainLayout>
          <div className="left-pane"></div>
          <div className="right-pane">
            <RightSidePane />
          </div>
        </MainLayout>
      </DragDropContextProvider>
    </StyledContainer>
  );
};
