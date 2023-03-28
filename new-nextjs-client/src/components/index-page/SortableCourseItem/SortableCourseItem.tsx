import styles from './SortableCourseItem.module.scss';
import { Course } from '@entities/course';
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
  red2,
  red3,
  gray7,
} from '@styles/variables';
import { selectOptionBgColorHoverDark } from '@styles/reusable-ui-variables';
import ColorPalette from './ColorPalette/ColorPalette';
import { ICourse } from '@entities/course';
import { useCourseMenuHandler } from '@hooks/useCourseItemHandler';
import VariableUnitForm from './VariableUnitForm/VariableUnitForm';

interface Props {
  course: ICourse;
  isInCourseBag: boolean;
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
  } = useSortable({
    id: props.course.id,
    data: {
      deptCode: props.course.deptCode,
      num: props.course.num,
      color: props.course.color,
    },
  });
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [color, setColor] = useState(props.course.color);
  const [isHover, setIsHover] = useState(false);
  const [isMenuTriggerHover, setIsMenuTriggerHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleColorSelect, handleCourseRemove, handleUnitUpdate } =
    useCourseMenuHandler(props.course.id, props.isInCourseBag);

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

  const handleContainerMouseEnter = () => {
    if (props.course.id.startsWith('overlay')) {
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
        className={cx('container', `color-${color}`, {
          dragging: isDragging,
          'drag-overlay': props.course.id.startsWith('overlay'),
        })}
      >
        <div className={cx('dept-code-num')}>
          <div className={cx('dept-code')}>{props.course.deptCode}</div>
          <div className={cx('num')}>{props.course.num}</div>
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
              mt="5px"
              borderRadius={borderRadiusSM}
              borderColor={theme === 'light' ? gray5 : gray4}
              fontSize={fontSizeMD}
              color={theme === 'light' ? defaultText : defaultTextDark}
              padding=".6rem .4rem"
              bgColor={theme === 'light' ? gray7 : gray2}
              minW={'12rem'}
            >
              <div className={cx('color-palette-wrapper')}>
                <ColorPalette
                  onColorSelect={handleColorSelect}
                  selectedColor={props.course.color}
                  setColor={setColor}
                />
              </div>
              {props.course.isVariableUnit ? (
                <div className={cx('variable-unit-form-wrapper')}>
                  <VariableUnitForm
                    minUnit={props.course.minUnit!}
                    maxUnit={props.course.maxUnit!}
                    onUnitUpdate={handleUnitUpdate}
                  />
                </div>
              ) : null}
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
                onClick={() => handleCourseRemove()}
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
