import styles from './VariableUnitForm.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/react';
import AppButton from '@components/shared/AppButton/AppButton';
import AppInput from '@components/shared/AppInput/AppInput';

const cx = classNames.bind(styles);

interface Props {
  minUnit: number;
  maxUnit: number;
  onUnitUpdate: (newUnit: number) => void;
}

interface Input {
  newUnit: number;
}

function VariableUnitForm(props: Props) {
  const { register, handleSubmit, formState, setValue } = useForm<Input>();
  return (
    <div className={cx('container')}>
      <FormLabel htmlFor="newUnit" fontSize={'1.4rem'}>
        Update unit
      </FormLabel>
      <div className={cx('form-wrapper')}>
        <AppInput
          id="newUnit"
          width="5.5rem"
          height="3.5rem"
          letterSpacing="1px"
          placeholder={`${props.minUnit}-${props.maxUnit}`}
          {...register('newUnit', {})}
        />

        <div className={cx('btn-wrapper')}>
          <AppButton
            kind="primary"
            type="submit"
            width="3.5rem"
            height="3.5rem"
          >
            Set
          </AppButton>
        </div>
      </div>
    </div>
  );
}

export default VariableUnitForm;
