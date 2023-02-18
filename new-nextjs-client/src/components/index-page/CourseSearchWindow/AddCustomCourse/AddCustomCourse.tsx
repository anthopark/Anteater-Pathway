import styles from './AddCustomCourse.module.scss';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import AppInput from '@components/shared/AppInput/AppInput';

import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import {
  bgColor2,
  bgColorDark2,
  borderRadiusSM,
  defaultText,
  defaultTextDark,
  fontSizeMD,
  gray4,
  gray5,
} from '@styles/variables';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  department: string;
  number: number;
  unit: number;
  title: string;
};

const AddCustomCourse = () => {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={AppButton}
        kind="secondary"
        leftIcon={<FontAwesomeIcon icon={plus} />}
      >
        Custom
      </MenuButton>

      <MenuList
        borderRadius={borderRadiusSM}
        borderColor={theme === 'light' ? gray5 : gray4}
        fontSize={fontSizeMD}
        color={theme === 'light' ? defaultText : defaultTextDark}
        padding="1.8rem 1.4rem"
        bgColor={theme === 'light' ? bgColor2 : bgColorDark2}
        w={'23rem'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputForm}>
            <label>Department</label>

            <AppInput
              id="department"
              placeholder="Ex. Econ, History"
              {...register('department')}
            />
          </div>

          <div className={styles.additionalIntoWrapper}>
            <div className={styles.inputForm} style={{ marginRight: '.7rem' }}>
              <label>Number</label>
              <AppInput
                id="number"
                placeholder="Ex. 101, 1A"
                {...register('number')}
              />
            </div>
            <div className={styles.inputForm}>
              <label>Unit</label>
              <AppInput
                id="unit"
                placeholder="Ex. 2, 4"
                {...register('unit')}
              />
            </div>
          </div>

          <div className={styles.inputForm}>
            <label className={styles.inputLabel}>Title</label>
            <AppInput
              id="title"
              placeholder="Ex. Basic statistics"
              {...register('title')}
            />
          </div>
          <div className={styles.createBtnWrapper}>
            <AppButton kind="primary" type="submit" width="20rem">
              Create
            </AppButton>
          </div>
        </form>
      </MenuList>
    </Menu>
  );
};

export default AddCustomCourse;
