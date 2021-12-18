import { useState } from "react";
import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { CustomCourseControl } from "./CustomCourseControl/CustomCourseControl";
import AcademicYearControl from "./AcademicYearControl";
import { CourseSearchBar } from "./CourseSearchBar/CourseSearchBar";
import { UserProfile } from "./UserProfile/UserProfile";
import RightSidePane from "./RightSidePane";
import LeftSidePane from "./LeftSidePane";
import { useAuthState } from "react-firebase-hooks/auth";
import { DragDropContextProvider } from "./DragDropContextProvider";
import { auth } from "src/firebase/firebase-config";

export const Planner = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isCourseDragging, setIsCourseDragging] = useState(false);

  console.log(`Loading: ${loading} | Current user: ${user} | Error: ${error}`);
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
      <DragDropContextProvider
        isCourseDragging={isCourseDragging}
        setIsCourseDragging={setIsCourseDragging}
      >
        <MainLayout>
          <div className="left-pane">
            <LeftSidePane isCourseDragging={isCourseDragging} />
          </div>
          <div className="right-pane">
            <RightSidePane />
          </div>
        </MainLayout>
      </DragDropContextProvider>
    </StyledContainer>
  );
};
