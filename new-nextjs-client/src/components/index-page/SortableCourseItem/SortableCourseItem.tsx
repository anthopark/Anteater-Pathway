import styles from './SortableCourseItem.module.scss';
import { Course } from 'src/models/course';
import classNames from 'classnames/bind';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSSProperties, memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { threeDot, trash, info } from '@styles/fontawesome';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import {
  borderRadiusXS,
  borderRadiusSM,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray2,
  gray4,
  gray5,
  gray6,
  white1,
  red2,
  red3,
} from '@styles/variables';
import { selectOptionBgColorHoverDark } from '@styles/reusable-ui-variables';

interface Props {
  course?: Course;
  isInCourseBag: boolean;
  sortableId?: UniqueIdentifier;
}

const cx = classNames.bind(styles);

const SortableCourseItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.sortableId ?? props.course!.id });
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);
  const [isMenuTriggerHover, setIsMenuTriggerHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isDragging) {
      setIsMenuOpen(false);
      setIsHover(false);
      setIsMenuTriggerHover(false);
    }
  }, [isDragging]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deptCode = () => {
    if (props.sortableId) {
      return (props.sortableId as string).split('-')[0];
    }
    return props.course!.courseInfo.deptCode;
  };

  const num = () => {
    if (props.sortableId) {
      return (props.sortableId as string).split('-')[1];
    }
    return props.course!.courseInfo.num;
  };

  const handleContainerMouseEnter = () => {
    if (Boolean(props.sortableId)) {
      return setIsHover(false);
    }
    setIsHover(true);
  };

  const handleContainerMouseLeave = () => {
    setIsHover(false);
  };

  const handleMenuTriggerMouseEnter = () => {
    setIsMenuTriggerHover(true);
  };

  const handleMenuTriggerMouseLeave = () => {
    setIsMenuTriggerHover(false);
  };

  const handleDetailsClick = () => {};

  const handleRemoveClick = () => {};

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cx('outer-container')}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div
        style={style}
        ref={setNodeRef}
        className={cx('container', {
          dragging: isDragging,
          'drag-overlay': Boolean(props.sortableId),
        })}
      >
        <div className={cx('dept-code-num')}>
          <div className={cx('dept-code')}>{deptCode()}</div>
          <div className={cx('num')}>{num()}</div>
        </div>
      </div>
      {isHover || isMenuOpen ? (
        <>
          <div
            className={cx('overlay')}
            style={{ cursor: 'grab' }}
            {...attributes}
            {...listeners}
          ></div>
          <Menu
            isLazy={true}
            strategy={'fixed'}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => {
              setIsMenuOpen(false);
              setIsMenuTriggerHover(false);
            }}
            closeOnSelect={false}
          >
            <MenuButton
              position="absolute"
              w="1.5rem"
              h="2.5rem"
              top="0.65rem"
              right="0.5rem"
              onMouseEnter={handleMenuTriggerMouseEnter}
              onMouseLeave={handleMenuTriggerMouseLeave}
            >
              <div
                className={cx('menu-trigger', {
                  'menu-trigger-hover': isMenuTriggerHover,
                  'menu-open': isMenuOpen,
                })}
              >
                <FontAwesomeIcon
                  className={cx('three-dot-icon', {
                    'menu-trigger-hover': isMenuTriggerHover,
                    'menu-open': isMenuOpen,
                  })}
                  icon={threeDot}
                />
              </div>
            </MenuButton>
            <MenuList
              w={'10rem'}
              mt="5px"
              borderRadius={borderRadiusSM}
              borderColor={theme === 'light' ? gray5 : gray4}
              fontSize={fontSizeMD}
              color={theme === 'light' ? defaultText : defaultTextDark}
              padding="6px 4px"
              bgColor={theme === 'light' ? white1 : gray2}
            >
              <MenuItem
                pl="12px"
                borderRadius={borderRadiusXS}
                bgColor="transparent"
                fontWeight={500}
                h="3.3rem"
                icon={
                  <FontAwesomeIcon className={cx('info-icon')} icon={info} />
                }
                onClick={handleDetailsClick}
                _hover={{
                  bgColor:
                    theme === 'light' ? gray6 : selectOptionBgColorHoverDark,
                }}
              >
                Details
              </MenuItem>
              <MenuItem
                pl="12px"
                borderRadius={borderRadiusXS}
                bgColor="transparent"
                fontWeight={500}
                h="3.3rem"
                color={theme === 'light' ? red3 : red2}
                icon={
                  <FontAwesomeIcon className={cx('trash-icon')} icon={trash} />
                }
                onClick={handleRemoveClick}
                _hover={{
                  bgColor:
                    theme === 'light' ? gray6 : selectOptionBgColorHoverDark,
                }}
              >
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : null}
    </div>
  );
};

export default memo(SortableCourseItem);
