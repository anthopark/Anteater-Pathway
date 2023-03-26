import styles from './AddYearDropdown.module.scss';
import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import useAppToast from '@hooks/useAppToast';
import useAppUser from '@hooks/useAppUser';
import { useEffect, useState } from 'react';

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
  const showToastBox = useAppToast();

  useEffect(() => {
    setYearOptions(
      yearOptions.map((option) => {
        return appUser.years.includes(option.value)
          ? { ...option, disabled: true }
          : { ...option, disabled: false };
      })
    );
  }, [appUser.years.length]);

  const onSelectChange = (newValue: YearOption) => {
    if (!appUser.years.includes(newValue.value)) {
      updateAppUser((draft) => {
        draft.addYear(newValue.value);
      });

      showToastBox({
        status: 'success',
        highlightedData: newValue.label,
        message: 'year added',
      });
    }
  };

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
