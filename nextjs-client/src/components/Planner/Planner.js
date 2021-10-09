import { StyledContainer, TopLayout, MainLayout } from "./styled";
import { AddCustomCourse } from "./AddCustomCourse";
import { AddAcademicYear } from "./AddAcademicYear";
import { CourseSearchBar } from "./CourseSearchBar";
import { UserProfile } from "./UserProfile";

export const Planner = () => {
  return (
    <StyledContainer>
      <TopLayout>
        <div className="left-pane">
          <AddAcademicYear />
          <CourseSearchBar />
          <AddCustomCourse />
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
