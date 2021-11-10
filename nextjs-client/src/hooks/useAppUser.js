import { useState, useEffect } from "react";
import { AppUser } from "src/entities/app-user";

export const useAppUser = () => {
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    setAppUser(new AppUser());
  }, []);

  const updateAppUser = (appUser) => {
    const newAppUser = new AppUser();
    newAppUser.isAuthenticated = appUser.isAuthenticated;
    newAppUser.planner = appUser.planner;
    newAppUser.tentativePlanner = appUser.tentativePlanner;
    setAppUser(newAppUser);
  };

  return { appUser, updateAppUser };
};
