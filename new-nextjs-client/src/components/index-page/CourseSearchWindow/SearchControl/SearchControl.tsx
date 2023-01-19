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

interface DeptOption {
  label: string;
  value: string;
}

interface Props {}

function SearchControl(props: Props) {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const [selectOptions, setSelectOptions] = useState<DeptOption[]>([
    { label: 'Computer Science (COMPSCI)', value: 'COMPSCI' },
    { label: 'Informatics (IN4MTX)', value: 'IN4MTX' },
  ]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
          placeholder="Select the department..."
          onFocus={() => setIsError(false)}
          options={selectOptions}
          onChange={(newValue) => {
            setSelectValue(newValue);
          }}
          isClearable
          customStyles={{
            dropdownIndicator: () => ({
              paddingLeft: '0px',
            }),
          }}
        />
        {isError ? (
          <span className={styles.errorMessage}>
            Please select department first.
          </span>
        ) : null}
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
          onFocus={() => selectValue === null && setIsError(true)}
          onChange={(newValue) => setInputValue(newValue.target.value)}
          placeholder="Ex. 1A, 101"
        />
      </FormControl>
    </div>
  );
}

export default SearchControl;
