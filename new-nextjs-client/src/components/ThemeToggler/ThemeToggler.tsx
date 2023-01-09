import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IconButton } from '@chakra-ui/react';
import { controlHeightMD } from '@styles/variables';
import { sun, moon } from '@styles/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ThemeToggler.module.scss';

type Props = {};

export default function ThemeToggler({}: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <IconButton
        height={'3rem'}
        width={'3rem'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Theme toggle"
        variant="unstyled"
        icon={
          theme === 'light' ? (
            <FontAwesomeIcon className={styles.themeIcon} icon={moon} />
          ) : (
            <FontAwesomeIcon className={styles.themeIcon} icon={sun} />
          )
        }
      />
    </div>
  );
}
