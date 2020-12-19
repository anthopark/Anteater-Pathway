import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '@components/AppContextProvider';

import {
    CustomUnitsFormContainer,
    FormBox,
    UnitInput,
    SubmitButton,
    IconBox,
} from './styled';

const CustomUnitsForm = ({ minUnit, maxUnit, courseId }) => {

    const { customUnitCourses, setCustomUnitCourses } = useContext(AppContext) 

    const [inputValue, setInputValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const [formStatus, setFormStatus] = useState('');

    const isValidateInput = () => {
        // check if the string contains all digit
        if (! /^\d+$/.test(inputValue)) return false;
        const unit = parseInt(inputValue);
        return unit >= minUnit && unit <= maxUnit;
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!isValidateInput()) return setIsFormValid(false);
        setFormStatus('loading');
        setTimeout(() => {
            const newCustomUnitCourses = { ...customUnitCourses };
            newCustomUnitCourses[courseId] = inputValue;
            setCustomUnitCourses(newCustomUnitCourses);
            setFormStatus('success');
        }, 250)
    }

    const formUI = (
        <FormBox onSubmit={(e) => onFormSubmit(e)}>
            <UnitInput
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsFormValid(true);
                }}
                isFormValid={isFormValid}
                placeholder={`${minUnit}-${maxUnit}`}
            />
            <SubmitButton>units</ SubmitButton>
        </FormBox>
    );

    const loadingUI = (
        <IconBox>
            {
                formStatus === 'loading' ?
                <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1.7rem' }} spin />
                : <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.7rem', color: 'green' }} />
            }
            
        </IconBox>

    );

    return (
        <CustomUnitsFormContainer>
            { formStatus === '' ? formUI : loadingUI}
        </CustomUnitsFormContainer>
    );
}

export default CustomUnitsForm;