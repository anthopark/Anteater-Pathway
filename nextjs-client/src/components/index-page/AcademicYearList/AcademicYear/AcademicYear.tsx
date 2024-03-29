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
import AppModal from '@components/shared/AppModal/AppModal';
import { IAcademicYear } from '@entities/academic-year';
import Quarter from './Quarter/Quarter';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  academicYear: IAcademicYear;
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

  const { isOver, setNodeRef } = useDroppable({
    id: `year-${props.academicYear.year}`,
  });

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
    if (openedIndex.length === 0 && isOver) {
      setOpenedIndex([0]);
      setShowRemoveIcon(true);
    }
  }, [isOver]);

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
    updateAppUser((draft) => draft.removeYear(props.academicYear.year));
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Accordion allowToggle index={openedIndex} onChange={handleExpand}>
      <AppModal
        isOpen={isModalOpen}
        onClose={onClose}
        headerTitle={`Delete ${`${props.academicYear.year}-${
          props.academicYear.year + 1
        }`} year?`}
        bodyText={`Are you sure you want to delete ${`${
          props.academicYear.year
        }-${props.academicYear.year + 1}`} year?`}
        actionButtonName="Delete"
        actionKind="danger"
        actionFn={handleDelete}
      />
      <AccordionItem
        bgColor={theme === 'light' ? bgColor2 : bgColorDark2}
        border="none"
        borderRadius={borderRadiusMD}
      >
        <div className={cx('header')} ref={setNodeRef}>
          <AccordionButton
            borderRadius={borderRadiusMD}
            p={isExpanded() ? '1.2rem .3rem 1.2rem 2rem' : '1.2rem 2rem'}
            color={theme === 'light' ? gray3 : gray6}
            justifyContent="space-between"
            _hover={{
              bgColor: theme === 'light' ? bgColor2 : bgColorDark2,
            }}
          >
            <div className={cx('year-text')}>
              <AccordionIcon fontSize="2.7rem" mr=".8rem" />
              {getYearText(props.academicYear.year)}
            </div>
          </AccordionButton>
          {showRemoveIcon ? (
            <animated.div
              className={cx('remove-icon-wrapper')}
              style={removeIconSpringProps}
            >
              <FontAwesomeIcon
                className={cx('trash-icon')}
                icon={trash}
                onClick={() => setIsModalOpen(true)}
              />
            </animated.div>
          ) : null}
        </div>
        <AccordionPanel>
          <div className={cx('quarters-container')}>
            {props.academicYear.quarters.map((quarter, index) => (
              <Quarter key={index} quarter={quarter} />
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AcademicYear;
