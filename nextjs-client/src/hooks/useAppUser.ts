import { AppUserContext } from '@contexts/AppUserContext/AppUserContext';
import { useContext } from 'react';

const useAppUser = () => useContext(AppUserContext);

export default useAppUser;
