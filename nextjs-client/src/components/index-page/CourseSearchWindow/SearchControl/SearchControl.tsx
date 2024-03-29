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
import DEFAULT_DEPARTMENT_DATA from 'src/data/default-department-data.json';
import Fuse from 'fuse.js';
import { getAllDepartments, getAllDepartmentCourses } from 'src/api/course';
import { Updater } from 'use-immer';
import { ResponseModel } from 'src/models/response-model';

const fuseOptions = {
  keys: ['value', 'label'],
  threshold: 0.3,
};
let fuse: Fuse<SelectOption>;

const mapDeptOptions = (deptData: ResponseModel.Department[]) => {
  return deptData.map((dept) => ({
    label: `${dept.name} (${dept.code})`,
    value: dept.code,
  }));
};

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  setClickedCourse: (course: ResponseModel.Course | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  searchResults: ResponseModel.Course[] | null;
  setSearchResults: (searchResults: ResponseModel.Course[] | null) => void;
  setDisplayResults: (displayResults: ResponseModel.Course[]) => void;
  updateSelectedIds: Updater<Set<string>>;
}

function SearchControl(props: Props) {
  const [deptData, setDeptData] = useState<ResponseModel.Department[]>(
    DEFAULT_DEPARTMENT_DATA
  );
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectInputValue, setSelectInputValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);

    let deptSelectOptions: SelectOption[];

    getAllDepartments()
      .then((deptData) => {
        deptSelectOptions = mapDeptOptions(deptData);
        setDeptData(deptData);
      })
      .catch(() => {
        deptSelectOptions = mapDeptOptions(DEFAULT_DEPARTMENT_DATA);
      })
      .finally(() => {
        setSelectOptions(deptSelectOptions);

        const fuseIndex = Fuse.createIndex(fuseOptions.keys, deptSelectOptions);
        fuse = new Fuse(deptSelectOptions, fuseOptions, fuseIndex);
      });
  }, []);

  useEffect(() => {
    if (selectInputValue === '') {
      return setSelectOptions(mapDeptOptions(deptData));
    }

    const fuseSearchResult = fuse.search(selectInputValue);

    setSelectOptions(
      fuseSearchResult.map((result) => ({
        label: result.item.label,
        value: result.item.value,
      }))
    );
  }, [selectInputValue]);

  useEffect(() => {
    setInputValue('');

    if (selectValue) {
      props.setIsLoading(true);
      getAllDepartmentCourses(selectValue)
        .then((courses) => {
          props.setSearchResults(courses);
        })
        .catch(() => props.setSearchResults([]))
        .finally(() => {
          props.setIsLoading(false);
        });
    } else {
      props.setSearchResults(null);
      props.setClickedCourse(null);
    }
    props.updateSelectedIds((draft) => draft.clear());
  }, [selectValue]);

  useEffect(() => {
    if (selectValue) {
      const filteredData = props.searchResults!.filter((course) =>
        course.num.includes(inputValue.trim().toUpperCase())
      );
      props.setDisplayResults(filteredData);
    }
  }, [inputValue]);

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
          onChange={(newValue: SelectOption) => {
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
            setInputValue(e.target.value);
          }}
          value={inputValue}
          placeholder="Ex. 1A, 101"
        />
      </FormControl>
    </div>
  );
}

export default SearchControl;
