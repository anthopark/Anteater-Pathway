import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import useAppUser from '@hooks/useAppUser';
import { useState } from 'react';
import styles from './AddYearDropdown.module.scss';

interface YearOption {
  value: number;
  label: string;
  disabled: boolean;
}

const getYearOptions = (): YearOption[] => {
  const getYearArray = (start: number, end: number) =>
    Array.from(Array(end - start + 1).keys()).map((x) => x + start);

  const currentYear: number = parseInt(
    new Date().getFullYear().toString().substring(2)
  );

  const yearOptions: YearOption[] = getYearArray(17, currentYear + 10).map(
    (year) => ({ value: year, label: `${year} / ${year + 1}`, disabled: false })
  );
  return yearOptions;
};

function AddYearDropdown() {
  const { appUser, updateAppUser } = useAppUser();
  const [yearOptions, setYearOptions] = useState(getYearOptions());

  const onSelectChange = (newValue: YearOption) => {
    // if there's exist value, do not update...
    // if updates happened, find that year from year options and set disabled: true

    if (!appUser.years.includes(newValue.value)) {
      updateAppUser((draft) => {
        draft.addYear(newValue.value);
      });

      const newYearOptionsArr = yearOptions.map((obj) => {
        if (obj.value === newValue.value) {
          return { ...obj, disabled: true };
        }
        return obj;
      });

      setYearOptions(newYearOptionsArr);
    }
  };
  console.log('APP USER', appUser.years);

  return (
    <div className={styles.container}>
      <AppSingleSelect
        isClearable={false}
        isOptionDisabled={(option: YearOption) => option.disabled}
        onChange={onSelectChange}
        options={yearOptions}
        placeholder="Add years"
        value={null}
        customStyles={{
          dropdownIndicator: () => ({
            paddingLeft: '0px',
          }),
        }}
      />
    </div>
  );
}

export default AddYearDropdown;
