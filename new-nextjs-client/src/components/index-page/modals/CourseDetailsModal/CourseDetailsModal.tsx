import styles from './CourseDetailsModal.module.scss';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  borderRadiusMD,
  fontSizeLG,
  gray1,
  gray7,
  letterSpacingLG,
  defaultText,
  defaultTextDark,
  gray4,
  fontSizeMD,
} from '@styles/variables';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import useAppToast from '@hooks/useAppToast';
import AppButton from '@components/shared/AppButton/AppButton';
import classNames from 'classnames/bind';
import { getOneCourse } from 'src/api/course';

interface Props {
  isCustomCreated: boolean;
  isOpen: boolean;
  onClose: () => void;
  deptCode: string;
  num: string;
  title?: string | null;
  unit: number | null;
}

const QUARTER_MAP: { [key: string]: string } = {
  fa: 'Fall',
  wi: 'Winter',
  sp: 'Spring',
  su1: 'Summer',
  su2: 'Summer',
  su10w: 'Summer',
};

const getQuarterText = (quarterCode: string) => {
  let [year, quarter] = quarterCode.split('-');

  return `${QUARTER_MAP[quarter]} ${parseInt(year) % 100} `;
};

const cx = classNames.bind(styles);

function CourseDetailsModal(props: Props) {
  const [mounted, setMounted] = useState(false);
  const [courseResponse, setCourseResponse] =
    useState<ResponseModel.Course | null>(null);
  const { theme } = useTheme();
  const showToastBox = useAppToast();

  useEffect(() => {
    if (props.isOpen && courseResponse === null && !props.isCustomCreated) {
      getOneCourse(props.deptCode, props.num)
        .then((course) => {
          setCourseResponse(course);
        })
        .catch((e) => {
          console.error(e);
          showToastBox({
            status: 'failure',
            message: 'Failed to load information. Server error :(',
            highlightedData: null,
          });
        });
    }
  }, [props.isOpen]);

  const getUnitText = useCallback(() => {
    if (courseResponse) {
      if (courseResponse.unit === null) return '';

      return courseResponse.isVariableUnit
        ? `${courseResponse.minUnit}-${courseResponse.maxUnit} units`
        : courseResponse.unit === 1
        ? `${courseResponse.unit} unit`
        : `${courseResponse.unit} units`;
    }

    return props.unit === 1 ? `${props.unit} unit` : `${props.unit} units`;
  }, [courseResponse]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={borderRadiusMD}
        bgColor={theme === 'light' ? gray7 : gray1}
        padding="2rem 2.5rem"
      >
        <ModalCloseButton
          fontSize="1.2rem"
          mt=".7rem"
          mr=".7rem"
          color={gray4}
        />

        <div className={cx('course-info-header')}>
          <div className={cx('top-row')}>
            <div
              className={cx('dept-code-num')}
            >{`${props.deptCode} ${props.num}`}</div>
            <div className={cx('unit')}>{getUnitText()}</div>
          </div>
          <div className={cx('title-row')}>{props.title}</div>
        </div>

        {courseResponse ? <div className={cx('course-info-body')}></div> : null}
        {props.isCustomCreated ? (
          <Alert status="warning" fontSize="1.5rem">
            <AlertIcon />
            You're viewing a custom created course.
          </Alert>
        ) : null}
      </ModalContent>
    </Modal>
  );
}

export default CourseDetailsModal;
