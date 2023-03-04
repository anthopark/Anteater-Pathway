import useAppUser from '@hooks/useAppUser';

export const useCourseMenuHandler = (
  courseId: string,
  isInCourseBag: boolean
) => {
  const { updateAppUser } = useAppUser();

  const handleColorSelect = (newColor: number) => {
    updateAppUser((draft) => {
      draft.updateCourseColor({
        courseId,
        isInCourseBag,
        newColor,
      });
    });
  };

  const handleCourseRemove = () => {
    if (isInCourseBag) {
      updateAppUser((draft) => {
        draft.removeCourseFromCourseBag(courseId);
      });
    }
  };

  return {
    handleColorSelect,
    handleCourseRemove,
  };
};
