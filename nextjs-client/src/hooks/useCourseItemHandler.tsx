import useAppUser from '@hooks/useAppUser';

export const useCourseMenuHandler = (
  courseId: string,
  isInCourseBag: boolean
) => {
  const { updateAppUser } = useAppUser();

  const handleColorSelect = (newColor: number) => {
    updateAppUser((draft) => {
      draft.updateCourseColor(courseId, isInCourseBag, newColor);
    });
  };

  const handleCourseRemove = () => {
    updateAppUser((draft) => {
      draft.removeCourse(courseId, isInCourseBag);
    });
  };

  const handleUnitUpdate = (newUnit: number) => {
    updateAppUser((draft) => {
      draft.updateCourseUnit(courseId, isInCourseBag, newUnit);
    });
  };

  return {
    handleColorSelect,
    handleCourseRemove,
    handleUnitUpdate,
  };
};
