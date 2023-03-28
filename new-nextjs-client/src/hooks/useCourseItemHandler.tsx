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
    console.log('newUnit', newUnit);
  };

  return {
    handleColorSelect,
    handleCourseRemove,
    handleUnitUpdate,
  };
};
