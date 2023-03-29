import styles from './VariableUnitForm.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@chakra-ui/react';
import AppButton from '@components/shared/AppButton/AppButton';
import AppInput from '@components/shared/AppInput/AppInput';
import useAppToast from '@hooks/useAppToast';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

interface Props {
  courseNumber: string;
  minUnit: number;
  maxUnit: number;
  onUnitUpdate: (newUnit: number) => void;
}

interface FormData {
  unit: number | null;
}

function VariableUnitForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      unit: null,
    },
  });
  const showToastBox = useAppToast();

  const onSubmit = (data: FormData) => {
    props.onUnitUpdate(data.unit!);

    showToastBox({
      status: 'success',
      message: `set to ${props.courseNumber}`,
      highlightedData: `${data.unit} ${data.unit === 1 ? 'unit' : 'units'}`,
    });
  };

  return (
    <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="unit" fontSize={'1.5rem'}>
        Update unit
      </FormLabel>
      <div className={cx('form-wrapper')}>
        <AppInput
          id="unit"
          style={{
            width: '5.5rem',
            height: '3.5rem',
            letterSpacing: '1px',
          }}
          type="number"
          placeholder={`${props.minUnit}-${props.maxUnit}`}
          {...register('unit', {
            valueAsNumber: true,
            required: 'Provide a unit',
            min: {
              value: props.minUnit,
              message: `Minimum is ${props.minUnit}`,
            },
            max: {
              value: props.maxUnit,
              message: `Maximum is ${props.maxUnit}`,
            },
          })}
          onChange={(e) => setValue('unit', e.target.value)}
        />

        <AppButton kind="primary" type="submit" width="3.5rem" height="3.5rem">
          Set
        </AppButton>
      </div>

      {errors.unit && errors.unit.message !== '' ? (
        <span className={cx('error-message')}>{errors.unit.message}</span>
      ) : null}
    </form>
  );
}

export default VariableUnitForm;
