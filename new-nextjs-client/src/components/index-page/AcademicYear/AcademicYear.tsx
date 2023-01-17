import {
  bgColor1,
  bgColor2,
  bgColorDark2,
  borderRadiusLG,
  borderRadiusMD,
  gray2,
  gray3,
  gray6,
} from '@styles/variables';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import styles from './AcademicYear.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trash } from '@styles/fontawesome';
import { IAppUser } from '@entities/app-user';
import useAppUser from '@hooks/useAppUser';

interface Props {
  year: number;
}

const getYearText = (year: number) => {
  return `20${year} - 20${year + 1}`;
};

const cx = classNames.bind(styles);

function AcademicYear(props: Props) {
  const { appUser, updateAppUser } = useAppUser();
  const [openedIndex, setOpenedIndex] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isExpanded = () => {
    return openedIndex.length === 1;
  };

  const handleExpand = () => {
    if (openedIndex.length === 1) {
      setOpenedIndex([]);
    } else {
      setOpenedIndex([0]);
    }
  };

  const handleDelete = () => {
    updateAppUser((draft) => {
      draft.removeYear(props.year);
    });
  };

  return (
    <div className={cx('container')}>
      <Accordion allowToggle index={openedIndex} onChange={handleExpand}>
        <AccordionItem
          bgColor={theme === 'light' ? bgColor2 : bgColorDark2}
          border="none"
          borderRadius={borderRadiusMD}
        >
          <div className={cx('header')}>
            <AccordionButton
              borderRadius={borderRadiusMD}
              p={isExpanded() ? '1.2rem .3rem 1.2rem 2rem' : '1.2rem 2rem'}
              color={theme === 'light' ? gray3 : gray6}
              justifyContent="space-between"
              _hover={{
                bgColor: theme === 'light' ? bgColor2 : bgColorDark2,
              }}
            >
              <div className={styles.yearText}>
                <AccordionIcon fontSize="2.7rem" mr=".8rem" />
                {getYearText(props.year)}
              </div>
            </AccordionButton>
            {isExpanded() ? (
              <div className={cx('removeBtnWrapper')}>
                <FontAwesomeIcon
                  className={cx('trashIcon')}
                  icon={trash}
                  onClick={handleDelete}
                />
              </div>
            ) : null}
          </div>
          <AccordionPanel>
            <div></div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AcademicYear;
