import { useState, useContext } from 'react';

import { AppContext } from '@components/AppContextProvider';
import { savePlan } from '@api/plan';

import {
    LoadSaveForm,
    TextInputBox,
    ErrorMessage,
    TextInput,
    ToggleButtonContainer,
    ToggleButton,
} from './styled';

const INVALID_INPUT_MESSAGE = 'Must be 4-20 characters';

const isInputValid = (inputString) => {
    if (!inputString) return false;
    if (inputString.trim().length > 20 || inputString.trim().length < 4) return false;
    return true;
}

// extracts course ids from planData
// returns [ {'20f': [courseId1, courseId2,] }, {}, ...]
const extractCourseIds = (planData) => {
    const result = [];
    for (const yearData of planData) {
        const convertedYearData = {};
        for (const [term, courses] of Object.entries(yearData)) {
            convertedYearData[term] = courses.map(course => course._id);
        }
        result.push(convertedYearData);
    }
    return result;
}

const LoadSaveControl = () => {

    const { planData, setPlanData } = useContext(AppContext);

    const [isLoadSelected, setIsLoadSelected] = useState(true);
    const [currentButton, setCurrentButton] = useState('load');
    const [inputValue, setInputValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (isLoadSelected && currentButton === 'load') {
            // Load
            if (!isInputValid(inputValue)) return setIsFormValid(false);
            console.log('load', inputValue);
            
        } else if (!isLoadSelected && currentButton === 'save') {
            // Save
            if (!isInputValid(inputValue)) return setIsFormValid(false);
            console.log('save', inputValue);

            const degreePlan = extractCourseIds(planData);
            console.log('degreePlan\n', degreePlan);
            savePlan(inputValue, degreePlan);
        }
    }

    return (
        <>
            <LoadSaveForm onSubmit={onFormSubmit}>
                <TextInputBox>
                    <TextInput
                        type="text"
                        value={inputValue}
                        isFormValid={isFormValid}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsFormValid(true);
                        }}
                        onClick={(e) => {
                            setIsFormValid(true);
                        }}
                        placeholder="ex. student ID"
                    />
                </TextInputBox>
                <div></div>
                <ToggleButtonContainer>
                    <ToggleButton
                        type="submit"
                        isSelected={isLoadSelected}
                        onClick={() => {
                            setIsLoadSelected(true);
                            setTimeout(() => setCurrentButton('load'), 0);
                        }}
                    >
                        Load
                </ToggleButton>
                    <ToggleButton
                        type="submit"
                        isSelected={!isLoadSelected}
                        onClick={() => {
                            setIsLoadSelected(false);
                            setTimeout(() => setCurrentButton('save'), 0);
                        }}
                    >
                        Save
                </ToggleButton>
                </ToggleButtonContainer>
            </LoadSaveForm>
            {
                isFormValid ?
                    undefined
                    : (
                        <ErrorMessage>
                            {INVALID_INPUT_MESSAGE}
                        </ErrorMessage>
                    )
            }
        </>

    );
}

export default LoadSaveControl;