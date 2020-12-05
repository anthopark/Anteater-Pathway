import Select from 'react-select';
import { useState, useEffect, useContext } from 'react';

import { AppContext } from '@components/AppContextProvider';
import { fetchCourses } from '@api/course';

import courseMetadata from '@data/course-metadata.json';

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
import { setBatchedUpdates } from 'react-query';

const fetchDeptOptions =  () => {
    return courseMetadata.departments.map((dept) => ({
        label: dept, value: dept
    }))
}
const fetchLevelOptions = () => {
    return courseMetadata.levels.map((level) => ({
        label: level, value: level
    }))
}

const CourseSearchForm = ({setIsLoading}) => {

    const { setSearchedCourses } = useContext(AppContext);
    

    const [deptValue, setDeptValue] = useState();
    const [levelValue, setLevelValue] = useState();
    const [numValue, setNumValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!deptValue) {
            return setIsFormValid(false);
        }

        setIsLoading(true);
        let result = await fetchCourses(
            deptValue.value,
            levelValue ? levelValue.value : undefined,
            numValue
        )
        setIsLoading(false);

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
                        options={fetchDeptOptions()}
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
                        options={fetchLevelOptions()}
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
