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
  primary1,
  accent1,
} from '@styles/variables';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import useAppToast from '@hooks/useAppToast';
import AppButton from '@components/shared/AppButton/AppButton';
import classNames from 'classnames/bind';
import { getAllCourseAttributes, getOneCourse } from 'src/api/course';
import DEFAULT_COURSE_ATTRIBUTES_DATA from 'src/data/default-course-attributes-data.json';
import { Spinner } from '@chakra-ui/react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState<ResponseModel.CourseAttribute[]>(
    DEFAULT_COURSE_ATTRIBUTES_DATA
  );

  useEffect(() => {
    if (props.isOpen && courseResponse === null && !props.isCustomCreated) {
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });

      getAllCourseAttributes()
        .then((data) => {
          setAttributes(data);
        })
        .catch(() => {
          setAttributes(DEFAULT_COURSE_ATTRIBUTES_DATA);
        });
    }
  }, [props.isOpen]);

  const getUnitText = () => {
    if (courseResponse) {
      if (courseResponse.unit === null) {
        return '';
      }

      return courseResponse.isVariableUnit
        ? `${props.unit} ${props.unit === 1 ? 'unit' : 'units'} (${
            courseResponse.minUnit
          }-${courseResponse.maxUnit})`
        : courseResponse.unit === 1
        ? `${courseResponse.unit} unit`
        : `${courseResponse.unit} units`;
    }

    return props.unit === 1 ? `${props.unit} unit` : `${props.unit} units`;
  };

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

        <div className={cx('title-section')}>
          <div className={cx('top-row')}>
            <div
              className={cx('course-code')}
            >{`${props.deptCode} ${props.num}`}</div>
            <div className={cx('unit')}>{getUnitText()}</div>
          </div>
          <div className={cx('course-title')}>{props.title}</div>
        </div>
        {isLoading ? (
          <div className={cx('spinner-container')}>
            <Spinner
              size="xl"
              color={theme === 'light' ? primary1 : accent1}
              speed="0.5s"
            />
          </div>
        ) : null}

        {courseResponse && !isLoading ? (
          <>
            {courseResponse.offered.length > 0 ? (
              <div className={cx('offered-quarter-section')}>
                <span className={cx('course-property-label')}>
                  Recent quarters:
                </span>
                <div className={cx('quarter-grid')}>
                  {courseResponse.offered
                    .slice(0, 9)
                    .map((quarterCode, index) => (
                      <div
                        key={index}
                        className={cx(
                          'quarter-box',
                          QUARTER_MAP[
                            quarterCode.split('-')[1] as string
                          ].toLowerCase()
                        )}
                      >
                        {getQuarterText(quarterCode)}
                      </div>
                    ))}
                </div>
              </div>
            ) : null}

            {attributes.map((attr, index) => {
              if (courseResponse![attr.value]) {
                return (
                  <div className={cx('course-attribute-section')} key={index}>
                    <span className={cx('attribute-label')}>{attr.name}:</span>
                    <div className={cx('attribute-content')}>
                      {courseResponse![attr.value]}
                    </div>
                  </div>
                );
              }
            })}
          </>
        ) : null}
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
