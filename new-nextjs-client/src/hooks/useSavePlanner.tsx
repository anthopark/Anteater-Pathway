import { useEffect } from 'react';
import { savePlannerToBE } from 'src/api/user';
import useAppToast from './useAppToast';
import useAppUser from './useAppUser';

export const useSavePlanner = () => {
  const { appUser } = useAppUser();
  const showToastBox = useAppToast();

  const savePlanner = () => {
    if (appUser.authToken) {
      savePlannerToBE(appUser.authToken, appUser.getPlannerInJSON()).catch(
        (error) => {
          console.error(error);
          showToastBox({
            status: 'failure',
            message: 'Failed to save planner. Server error :(',
            highlightedData: null,
          });
        }
      );
    }
  };

  useEffect(() => {
    if (appUser.authToken && appUser.isPlannerLoaded) {
      savePlanner();
    }
  }, [appUser]);
};
