import {
  bgColor2,
  bgColorDark2,
  borderRadiusMD,
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
import useAppUser from '@hooks/useAppUser';
import { useSpring, animated } from '@react-spring/web';
import { IAppUser } from '@entities/app-user';
import AppModal from '@components/shared/AppModal/AppModal';

interface Props {
  appUser: IAppUser;
  year: number;
}

const getYearText = (year: number) => {
  return `20${year} - 20${year + 1}`;
};

const cx = classNames.bind(styles);

const AcademicYear = (props: Props) => {
  const { updateAppUser } = useAppUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openedIndex, setOpenedIndex] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
  const [removeIconSpringProps, removeIconSpringApi] = useSpring(() => ({
    marginRight: '-0.5rem',
    opacity: 0,
  }));

  useEffect(() => {
    if (mounted) {
      removeIconSpringApi.start({
        marginRight: isExpanded() ? '2rem' : '-0.5rem',
        opacity: isExpanded() ? 1 : 0,
        onRest: () => {
          if (!isExpanded()) {
            setShowRemoveIcon(false);
          } else {
            setShowRemoveIcon(true);
          }
        },
      });
    }
  }, [openedIndex]);

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
      setShowRemoveIcon(true);
    }
  };

  const handleDelete = () => {
    updateAppUser((draft) => draft.removeYear(props.year));
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Accordion allowToggle index={openedIndex} onChange={handleExpand}>
      <AppModal
        isOpen={isModalOpen}
        onClose={onClose}
        headerTitle={`Delete ${`${props.year}-${props.year + 1}`} year?`}
        bodyText={`Are you sure you want to delete ${`${props.year}-${
          props.year + 1
        }`} year?`}
        actionButtonName="Delete"
        actionKind="primary"
        actionFn={handleDelete}
      />
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
          {showRemoveIcon ? (
            <animated.div
              className={cx('removeIconWrapper')}
              style={removeIconSpringProps}
            >
              <FontAwesomeIcon
                className={cx('trashIcon')}
                icon={trash}
                onClick={() => setIsModalOpen(true)}
              />
            </animated.div>
          ) : null}
        </div>
        <AccordionPanel>
          <div></div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AcademicYear;
