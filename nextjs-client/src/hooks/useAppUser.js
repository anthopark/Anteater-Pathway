import { useState, useEffect } from "react";
import { AppUser } from "src/entities/app-user";

export const useAppUser = () => {
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    setAppUser(new AppUser());
  }, []);

  return { appUser, setAppUser };
};
