import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import styles from './AddYearDropdown.module.scss';

interface YearOption {
  value: number;
  label: string;
  disabled: boolean;
}

const getYearOptions = () => {
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
  const onSelectChange = (newValue: YearOption) => {
    console.log(newValue);
  };

  return (
    <div className={styles.container}>
      <AppSingleSelect
        isClearable={false}
        isOptionDisabled={(option: YearOption) => option.disabled}
        onChange={onSelectChange}
        options={getYearOptions()}
        placeholder="Add year"
      />
    </div>
  );
}

export default AddYearDropdown;
