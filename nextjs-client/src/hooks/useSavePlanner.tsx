import { useDndMonitor } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { savePlannerToBE } from 'src/api/user';
import useAppToast from './useAppToast';
import useAppUser from './useAppUser';

export const useSavePlanner = () => {
  const { appUser, updateAppUser } = useAppUser();
  const showToastBox = useAppToast();
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd() {
      setIsDragging(false);
      updateAppUser((draft) => {
        draft.updatePlanner();
      });
    },
  });

  const savePlanner = () => {
    if (appUser.authToken) {
      savePlannerToBE(appUser.authToken, appUser.getPlannerInJSON()).catch(
        (error) => {
          console.error(error);
          showToastBox({
            status: 'failure',
            message: 'Failed to save change. Server error :(',
            highlightedData: null,
          });
        }
      );
    }
  };

  useEffect(() => {
    if (appUser.authToken && appUser.plannerLoaded && !isDragging) {
      savePlanner();
    }
  }, [appUser]);
};
