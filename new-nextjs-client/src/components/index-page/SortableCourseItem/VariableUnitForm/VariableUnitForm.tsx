import styles from './VariableUnitForm.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@chakra-ui/react';
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

  const updateUnit = (newUnit: Input) => {
    console.log(newUnit);
  };

  return (
    <form className={cx('container')} onSubmit={handleSubmit(updateUnit)}>
      <FormLabel htmlFor="newUnit" fontSize={'1.5rem'}>
        Update unit
      </FormLabel>
      <div className={cx('form-wrapper')}>
        <AppInput
          id="newUnit"
          style={{
            width: '5.5rem',
            height: '3.5rem',
          }}
          placeholder={`${props.minUnit}-${props.maxUnit}`}
          {...register('newUnit', {})}
        />

        <AppButton kind="primary" type="submit" width="3.5rem" height="3.5rem">
          Set
        </AppButton>
      </div>
    </form>
  );
}

export default VariableUnitForm;
