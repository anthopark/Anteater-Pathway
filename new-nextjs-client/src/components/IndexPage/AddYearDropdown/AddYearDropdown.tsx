import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';

interface YearOption {
  value: number;
  label: string;
  disabled: boolean;
}

const options: YearOption[] = [
  { value: 22, label: '22 / 23', disabled: true },
  { value: 23, label: '23 / 24', disabled: false },
  { value: 24, label: '24 / 25', disabled: false },
];

function AddYearDropdown() {
  const onSelectChange = (newValue: YearOption) => {
    console.log(newValue);
  };

  return (
    <div>
      <AppSingleSelect
        isClearable={false}
        isOptionDisabled={(option: YearOption) => option.disabled}
        onChange={onSelectChange}
        options={options}
        placeholder="Add years..."
      />
    </div>
  );
}

export default AddYearDropdown;
