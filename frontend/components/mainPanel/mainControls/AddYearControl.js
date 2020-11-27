import Select from 'react-select';
import { useEffect, useContext, useState } from 'react';

import { AppContext } from '@components/AppContextProvider';


import {
    AddYearForm,
    MainControlButton,
    dropdownStyle,
    dropdownErrorStyle,
} from './styled';

const generateYearOptions = (startYear, lastYear) => {
    return Array(lastYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx} & ${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}

const AddYearControl = () => {

    const { yearOptions, setYearOptions } = useContext(AppContext);
    const [yearValue, setYearValue] = useState(null);
    const [isFormValid, setIsFormValid] = useState(true);

    useEffect(() => {
        setYearOptions(generateYearOptions(15, 30));
    }, [])

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!yearValue) {
            return setIsFormValid(false);
        }

    }

    return (
        <AddYearForm onSubmit={onFormSubmit}>
            <Select
                instanceId='addYear'
                options={yearOptions}
                styles={isFormValid ? dropdownStyle : dropdownErrorStyle}
                value={yearValue}
                onChange={(e) => { setYearValue(e); setIsFormValid(true); }}
            />
            <div></div>
            <MainControlButton type="submit">
                Add
            </MainControlButton>
        </AddYearForm>
    );
}

export default AddYearControl;