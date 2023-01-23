import { useState, useEffect } from 'react';
import styles from './SearchControl.module.scss';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import {
  defaultText,
  defaultTextDark,
  fontSizeMD,
  letterSpacingMD,
} from '@styles/variables';
import AppSingleSelect from '@components/shared/AppSingleSelect/AppSingleSelect';
import AppInput from '@components/shared/AppInput/AppInput';
import DEFAULT_DEPARTMENTS_DATA from 'src/data/departments.json';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['value', 'label'],
  threshold: 0.3,
};
let fuse: Fuse<DeptOption>;

interface DeptOption {
  label: string;
  value: string;
}

interface Props {}

function SearchControl(props: Props) {
  const [deptData, setDeptData] = useState(
    DEFAULT_DEPARTMENTS_DATA.departments
  );
  const [selectOptions, setSelectOptions] = useState<DeptOption[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectInputValue, setSelectInputValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // TODO: load dept data from BE and setDeptData
    const deptOptions = deptData.map((dept) => ({
      label: `${dept.name} (${dept.code})`,
      value: dept.code,
    }));
    setSelectOptions(deptOptions);

    const fuseIndex = Fuse.createIndex(fuseOptions.keys, deptOptions);
    fuse = new Fuse(deptOptions, fuseOptions, fuseIndex);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectInputValue === '') {
      return setSelectOptions(
        deptData.map((dept) => ({
          label: `${dept.name} (${dept.code})`,
          value: dept.code,
        }))
      );
    }

    const fuseSearchResult = fuse.search(selectInputValue);

    setSelectOptions(
      fuseSearchResult.map((result) => ({
        label: result.item.label,
        value: result.item.value,
      }))
    );
  }, [selectInputValue]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <FormControl className={styles.departmentSelectWrapper} isRequired>
        <FormLabel
          fontSize={fontSizeMD}
          letterSpacing={letterSpacingMD}
          color={theme === 'light' ? defaultText : defaultTextDark}
        >
          Department
        </FormLabel>

        <AppSingleSelect
          customStyles={{
            dropdownIndicator: () => ({
              paddingLeft: '0px',
            }),
          }}
          filterOptions={() => true}
          inputValue={selectInputValue}
          isClearable
          options={selectOptions}
          onChange={(newValue: DeptOption) => {
            setSelectValue(newValue?.value);
          }}
          onInputChange={(newInputValue) => {
            setSelectInputValue(newInputValue);
          }}
          placeholder="Select the department"
        />
      </FormControl>
      <FormControl>
        <FormLabel
          fontSize={fontSizeMD}
          letterSpacing={letterSpacingMD}
          color={theme === 'light' ? defaultText : defaultTextDark}
        >
          Number
        </FormLabel>
        <AppInput
          onChange={(e) => {
            setInputValue(e.target.value === '' ? null : e.target.value);
          }}
          placeholder="Ex. 1A, 101"
        />
      </FormControl>
    </div>
  );
}

export default SearchControl;
