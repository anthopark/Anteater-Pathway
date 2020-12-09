import Select from 'react-select';
import { useEffect, useContext, useState } from 'react';

import { AppContext } from '@components/AppContextProvider';


import {
    AddYearForm,
    MainControlButton,
    dropdownStyle,
    dropdownErrorStyle,
} from './styled';


const AddYearControl = ({ addAcademicYear }) => {

    const { yearOptions } = useContext(AppContext);
    const [yearValue, setYearValue] = useState(null);
    const [isFormValid, setIsFormValid] = useState(true);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!yearValue) {
            return setIsFormValid(false);
        }

        addAcademicYear(yearValue.value.split('/')[0]);
        setYearValue(null);
    }

    return (
        <AddYearForm onSubmit={onFormSubmit}>
            <Select
                instanceId='addYear'
                options={yearOptions}
                styles={isFormValid ? dropdownStyle : dropdownErrorStyle}
                value={yearValue}
                onChange={(e) => { setYearValue(e); setIsFormValid(true); }}
                placeholder="school year"
            />
            <div></div>
            <MainControlButton type="submit">
                Add
            </MainControlButton>
        </AddYearForm>
    );
}

export default AddYearControl;