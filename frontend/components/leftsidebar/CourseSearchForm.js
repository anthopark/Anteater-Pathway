import Select from 'react-select';
import { useState, useEffect } from 'react';

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
} from './styled';

const fetchAllDistinctDept = async () => {
    let data = []
    try {
        const response = await courseAPI.get('dept/all');
        data = response.data;
    } catch (e) {
        console.log(e.toString());
        return []
    }

    return data.map(dept => ({ label: dept, value: dept}));
}


const CourseSearchForm = () => {
    const levelOptions = [
        { label: 'Lower Division', value: 'Lower Division' },
        { label: 'Upper Division', value: 'Upper Division' },
        { label: 'Undergraduate', value: 'Undergraduate' },
        { label: 'Graduate', value: 'Graduate' },
        { label: 'Other', value: 'Other' },
    ];

    const [deptValue, setDeptValue] = useState();
    const [levelValue, setLevelValue] = useState();
    const [numValue, setNumValue] = useState('');
    const [deptOptions, setDeptOptions] = useState([]);
    
    useEffect(() => {
        const fetchDept = async () => {
            setDeptOptions(await fetchAllDistinctDept());
        }

        fetchDept();
    }, [])


    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log('Submit!');
    }

    return (
        <SearchFormContainer>
            <SearchForm onSubmit={onFormSubmit}>
                <FormFieldBox>
                    <FormLabel>Department</FormLabel>
                    <Select
                        instanceId='dept'
                        styles={dropdownStyle}
                        options={deptOptions}
                        value={deptValue}
                        placeholder='ex. ECON, HIST'
                        onChange={e => setDeptValue(e)}
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
