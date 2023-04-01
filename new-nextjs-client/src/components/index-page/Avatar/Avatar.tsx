import styles from './Avatar.module.scss';
import {
  Avatar as ChakraAvatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import AppButton from '@components/shared/AppButton/AppButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/service-access';
import { signOut } from 'firebase/auth';
import SignInModal from '../modals/SignInModal/SignInModal';
import {
  borderRadiusSM,
  borderRadiusXS,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray2,
  gray4,
  gray5,
  gray6,
  white1,
} from '@styles/variables';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { selectOptionBgColorHoverDark } from '@styles/reusable-ui-variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut as signOutIcon } from '@styles/fontawesome';
import useAppUser from '@hooks/useAppUser';
import { loadPlannerFromBE, savePlannerToBE, signInToBE } from 'src/api/user';
import { useInterval } from 'use-interval';
import useAppToast from '@hooks/useAppToast';
import { useSavePlanner } from '@hooks/useSavePlanner';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Avatar() {
  const { appUser, updateAppUser } = useAppUser();
  const [firebaseUser, loading, error] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const showToastBox = useAppToast();

  const handleSignIn = async (authToken: string) => {
    if (!authToken) {
      throw new Error('Auth Token must be defined');
    }

    const signInResult = await signInToBE(authToken);

    if (signInResult.isFirstSignIn) {
      await savePlannerToBE(authToken, appUser.getPlannerInJSON());

      showToastBox({
        status: 'success',
        highlightedData: null,
        message: 'Welcome to Anteater Pathway :)',
      });
    } else {
      const plannerFromBE = await loadPlannerFromBE(authToken);

      updateAppUser((draft) => {
        draft.setPlannerFromBE(plannerFromBE);
        draft.plannerLoaded = true;
      });

      showToastBox({
        status: 'success',
        highlightedData: null,
        message: 'Signed in successfully :)',
      });
    }

    setIsSigningIn(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * This hook is responsible for saving the planner data to BE
   */
  useSavePlanner();

  useEffect(() => {
    if (firebaseUser) {
      setIsSigningIn(true);

      firebaseUser.getIdToken().then((authToken) => {
        updateAppUser((draft) => {
          draft.authToken = authToken;
        });

        handleSignIn(authToken).catch(() => {
          showToastBox({
            status: 'failure',
            highlightedData: null,
            message: 'Signed in failed. Server error :(',
          });
        });
      });
    } else {
      updateAppUser((draft) => {
        draft.authToken = undefined;
        draft.plannerLoaded = false;
      });
    }
  }, [firebaseUser]);

  /**
   * Refresh idToken for every 30 minutes if user is signed in
   */
  useInterval(
    () => {
      if (firebaseUser) {
        firebaseUser.getIdToken(true).then((authToken) => {
          updateAppUser((draft) => {
            draft.authToken = authToken;
          });
        });
      }
    },
    1000 * 60 * 30,
    false
  );

  if (!mounted) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut(auth);

    updateAppUser((draft) => {
      draft.reset();
    });

    showToastBox({
      status: 'success',
      message: 'Signed out. See you soon!',
      highlightedData: null,
    });
  };

  let uiContent;

  if (isSigningIn) {
    uiContent = (
      <div className={cx('signing-in-loading-box')}>
        <div className={cx('dot-elastic')}></div>
      </div>
    );
  } else if (firebaseUser) {
    uiContent = (
      <Menu>
        <MenuButton
          as={ChakraAvatar}
          icon={
            <ChakraAvatar
              name={firebaseUser.displayName!}
              src={firebaseUser.photoURL!}
              size="lg"
              cursor="pointer"
            />
          }
        />
        <MenuList
          minW="12rem"
          mt="5px"
          borderRadius={borderRadiusSM}
          borderWidth={theme === 'light' ? '2px' : '1px'}
          borderColor={theme === 'light' ? gray5 : gray4}
          fontSize={fontSizeMD}
          color={theme === 'light' ? defaultText : defaultTextDark}
          padding="6px 4px"
          bgColor={theme === 'light' ? white1 : gray2}
        >
          <MenuItem
            pl="12px"
            onClick={handleSignOut}
            borderRadius={borderRadiusXS}
            bgColor="transparent"
            h="3.3rem"
            icon={
              <FontAwesomeIcon
                className={styles.menuItemIcon}
                icon={signOutIcon}
              />
            }
            _hover={{
              bgColor: theme === 'light' ? gray6 : selectOptionBgColorHoverDark,
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  } else {
    uiContent = (
      <>
        <AppButton kind="primary" onClick={onOpen}>
          Sign in
        </AppButton>
        <SignInModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }

  return <>{uiContent}</>;
}

export default Avatar;
