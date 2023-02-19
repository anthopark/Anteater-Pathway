import styles from './AddCustomCourse.module.scss';
import { useTheme } from 'next-themes';
import AppInput from '@components/shared/AppInput/AppInput';

import AppButton from '@components/shared/AppButton/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { plus } from '@styles/fontawesome';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

import {
  bgColor2,
  bgColorDark2,
  borderRadiusSM,
  defaultTextDark,
  gray4,
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
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <AppButton kind="secondary" leftIcon={<FontAwesomeIcon icon={plus} />}>
          Custom
        </AppButton>
      </PopoverTrigger>
      <PopoverContent
        borderRadius={borderRadiusSM}
        borderColor={theme === 'light' ? gray5 : gray4}
        color={theme === 'light' ? defaultText : defaultTextDark}
        padding="1.2rem .8rem"
        bg={theme === 'light' ? bgColor2 : bgColorDark2}
        w={'25rem'}
      >
        <PopoverBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <div className={styles.inputForm}>
                <FormLabel htmlFor="department" className={styles.inputLabel}>
                  Department
                </FormLabel>
                <AppInput
                  id="department"
                  placeholder="Ex. Econ, History"
                  {...register('department', { required: true })}
                />
              </div>
            </FormControl>

            <div className={styles.additionalIntoWrapper}>
              <FormControl>
                <div
                  className={styles.inputForm}
                  style={{ marginRight: '.7rem' }}
                >
                  <FormLabel htmlFor="number" className={styles.inputLabel}>
                    Number
                  </FormLabel>
                  <AppInput
                    id="number"
                    placeholder="Ex. 101, 1A"
                    {...register('number', { required: true })}
                  />
                </div>
              </FormControl>
              <FormControl>
                <div className={styles.inputForm}>
                  <FormLabel htmlFor="unit" className={styles.inputLabel}>
                    Unit
                  </FormLabel>
                  <AppInput
                    id="unit"
                    placeholder="Ex. 2, 4"
                    {...register('unit', { required: true })}
                  />
                </div>
              </FormControl>
            </div>

            <div className={styles.inputForm}>
              <FormLabel className={styles.inputLabel}>Title</FormLabel>
              <AppInput
                id="title"
                placeholder="Ex. Basic statistics"
                {...register('title')}
              />
            </div>

            <div className={styles.createBtnWrapper}>
              <AppButton kind="primary" type="submit" width="100%">
                Create
              </AppButton>
            </div>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddCustomCourse;
