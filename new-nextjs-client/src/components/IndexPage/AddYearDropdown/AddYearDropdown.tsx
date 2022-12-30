import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function AddYearDropdown() {
  return (
    <div>
      <AppSingleSelect
        isClearable={false}
        options={options}
        placeholder="Add years..."
      />
    </div>
  );
}

export default AddYearDropdown;
