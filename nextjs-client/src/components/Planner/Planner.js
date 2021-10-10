import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { CustomCourseControl } from "./CustomCourseControl";
import AcademicYearControl from "./AcademicYearControl";
import { CourseSearchBar } from "./CourseSearchBar/CourseSearchBar";
import { UserProfile } from "./UserProfile";

export const Planner = () => {
  return (
    <StyledContainer>
      <TopLayout>
        <div className="left-pane">
          <AcademicYearControl />
          <CourseSearchBar />
          <CustomCourseControl />
        </div>
        <div className="right-pane">
          <UserProfile />
        </div>
      </TopLayout>
      <MainLayout>
        <div className="left-pane"></div>
        <div className="right-pane"></div>
      </MainLayout>
    </StyledContainer>
  );
};
