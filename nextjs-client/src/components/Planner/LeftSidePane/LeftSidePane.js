import AcademicYearDislay from "./AcademicYearDisplay";
import { StyledContainer } from "./styled";
import UndoButton from "./UndoButton";

export const LeftSidePane = () => {
  return (
    <StyledContainer>
      <div className="undo-box">
        <UndoButton />
      </div>
      <AcademicYearDislay />
    </StyledContainer>
  );
};
