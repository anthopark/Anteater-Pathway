import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@chakra-ui/react';

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
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme}
    </Button>
  );
}
