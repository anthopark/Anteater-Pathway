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
  gray3,
  gray4,
  gray5,
  gray6,
  white1,
} from '@styles/variables';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  selectBgColorActiveDark,
  selectOptionBgColorHoverDark,
} from '@styles/reusable-ui-variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut as signOutIcon } from '@styles/fontawesome';

function Avatar() {
  const [firebaseUser, loading, error] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      {firebaseUser ? (
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
            borderColor={theme === 'light' ? gray5 : gray4}
            fontSize={fontSizeMD}
            color={theme === 'light' ? defaultText : defaultTextDark}
            padding="6px 4px"
            bgColor={theme === 'light' ? white1 : selectBgColorActiveDark}
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
                bgColor:
                  theme === 'light' ? gray6 : selectOptionBgColorHoverDark,
              }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <AppButton kind="primary" onClick={onOpen}>
            Sign in
          </AppButton>
          <SignInModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
}

export default Avatar;
