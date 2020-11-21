import Select from 'react-select';
import { useState, useEffect, useContext } from 'react';

import { AppContext } from '@components/AppContextProvider';
import courseAPI from '@api/course';
import {
    SearchFormContainer,
    SearchForm,
    FormFieldBox,
    FormLabel,
    FormTextInput,
    ThreeColumnGridBox,
    SearchButton,
    dropdownStyle,
    dropdownErrorStyle,
} from './styled';

const fetchAllDistinctDept = async () => {
    let allDepartments = []
    try {
        const response = await courseAPI.get('dept/all');
        allDepartments = response.data;
        return allDepartments.map(dept => ({ label: dept, value: dept }));
    } catch (e) {
        console.log(e.toString());
        return []
    }
}

const fetchCourses = async (dept, level, num) => {

    const params = {
        dept, level, num
    }
    let courses = []
    try {
        const response = await courseAPI.get('search', { params });
        courses = response.data;
        return courses;
    } catch (e) {
        console.log(e.toString());
        return []
    }
}


const CourseSearchForm = () => {
    const levelOptions = [
        { label: 'Lower Division', value: 'Lower Division' },
        { label: 'Upper Division', value: 'Upper Division' },
        { label: 'Undergraduate', value: 'Undergraduate' },
        { label: 'Graduate', value: 'Graduate' },
        { label: 'Other', value: 'Other' },
    ];

    const { setSearchedCourses } = useContext(AppContext);

    const [deptValue, setDeptValue] = useState();
    const [levelValue, setLevelValue] = useState();
    const [numValue, setNumValue] = useState('');
    const [deptOptions, setDeptOptions] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);

    useEffect(() => {
        const fetchDept = async () => {
            setDeptOptions(await fetchAllDistinctDept());
        }

        fetchDept();
    }, [])


    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!deptValue) {
            return setIsFormValid(false);
        }
        const result = await fetchCourses(
            deptValue.value,
            levelValue ? levelValue.value : undefined,
            numValue
        )
        
        setSearchedCourses(result);
    }

    return (
        <SearchFormContainer>
            <SearchForm onSubmit={onFormSubmit}>
                <FormFieldBox>
                    <FormLabel>Department</FormLabel>
                    <Select
                        instanceId='dept'
                        styles={isFormValid ? dropdownStyle : dropdownErrorStyle}
                        options={deptOptions}
                        value={deptValue}
                        placeholder='ex. ECON, HIST'
                        isClearable
                        onChange={e => { setDeptValue(e); setIsFormValid(true); }}
                    />
                </FormFieldBox>
                <FormFieldBox>
                    <FormLabel>Level</FormLabel>
                    <Select
                        instanceId='level'
                        styles={dropdownStyle}
                        options={levelOptions}
                        value={levelValue}
                        placeholder='ex. Upper Div.'
                        isClearable
                        onChange={e => setLevelValue(e)}
                    />
                </FormFieldBox>
                <FormFieldBox>
                    <FormLabel>Number</FormLabel>
                    <ThreeColumnGridBox>
                        <FormTextInput
                            type='text'
                            placeholder='ex. 1A, 122B'
                            value={numValue}
                            onChange={e => setNumValue(e.target.value)}
                        />
                        <div></div>
                        <SearchButton
                            type='submit'
                        >
                            Zot!
                        </SearchButton>
                    </ThreeColumnGridBox>
                </FormFieldBox>
            </SearchForm>
        </SearchFormContainer>

    );
}

export default CourseSearchForm;
