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
  variableUnit: number | null;
}

function VariableUnitForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      variableUnit: null,
    },
  });
  const showToastBox = useAppToast();

  const onSubmit = (data: FormData) => {
    props.onUnitUpdate(data.variableUnit!);

    showToastBox({
      status: 'success',
      message: `set for ${props.courseNumber}`,
      highlightedData: `${data.variableUnit} ${
        data.variableUnit === 1 ? 'unit' : 'units'
      }`,
    });
  };

  return (
    <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="unit" fontSize={'1.5rem'}>
        Update unit
      </FormLabel>
      <div className={cx('form-wrapper')}>
        <AppInput
          id="variableUnit"
          style={{
            width: '5.5rem',
            height: '3.5rem',
            letterSpacing: '1px',
          }}
          type="number"
          placeholder={`${props.minUnit}-${props.maxUnit}`}
          {...register('variableUnit', {
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
        />

        <AppButton kind="primary" type="submit" width="3.5rem" height="3.5rem">
          Set
        </AppButton>
      </div>

      {errors.variableUnit && errors.variableUnit.message !== '' ? (
        <span className={cx('error-message')}>
          {errors.variableUnit.message}
        </span>
      ) : null}
    </form>
  );
}

export default VariableUnitForm;
