import { createContext, ReactNode, useContext } from 'react';
import { AppUser, IAppUser } from '@entities/app-user';
import { useImmer, Updater } from 'use-immer';

interface IAppUserContext {
  appUser: IAppUser;
  updateAppUser: Updater<IAppUser>;
}

const AppUserContext = createContext<IAppUserContext>({} as IAppUserContext);

interface Props {
  children: ReactNode;
}

function AppUserProvider({ children }: Props) {
  const [appUser, updateAppUser] = useImmer<IAppUser>(new AppUser());

  return (
    <AppUserContext.Provider
      value={{
        appUser,
        updateAppUser,
      }}
    >
      {children}
    </AppUserContext.Provider>
  );
}

export { AppUserContext, AppUserProvider };
