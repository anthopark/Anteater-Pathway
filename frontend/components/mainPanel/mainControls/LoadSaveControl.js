import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '@components/AppContextProvider';
import { 
    savePlan, loadPlan,
    PLAN_SAVED_NEW, PLAN_LOADED,
    PLAN_SAVED_OLD, PLAN_LOAD_NOT_FOUND,
    PLAN_SAVED_FAILED, PLAN_LOAD_FAILED,
  } from '@api/plan';

import {
    LoadSaveFormContainer,
    LoadSaveForm,
    TextInputContainer,
    TextInputBox,
    FormMessage,
    TextInput,
    StatusIconBox,
    ToggleButtonContainer,
    ToggleButton,
} from './styled';


const FORM_INPUT_INVALID = 1;
const FORM_LOADING = 2;
const FORM_SAVE_SUCCESS = 3;
const FORM_SAVE_FAIL = 4;
const FORM_LOAD_SUCCESS = 5;
const FORM_LOAD_NOT_FOUND = 6;
const FORM_LOAD_FAIL = 7;

const INVALID_INPUT_MESSAGE = 'Must be 4-20 characters';
const SAVE_SUCCESS_MESSAGE = 'Saved!';
const SAVE_FAIL_MESSAGE = 'Something went wrong :(';
const LOAD_SUCCESS_MESSAGE = 'Loaded!';
const LOAD_NOT_FOUND_MESSAGE = 'ID not found :(';
const LOAD_FAIL_MESSAGE = 'Something went wrong :('


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


const createStatusIconUI = (formStatus) => {
    if (formStatus === FORM_LOADING) {
        return (
            <StatusIconBox>
                <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1.8rem' }} spin />
            </StatusIconBox>
        );
    } else if (formStatus === FORM_SAVE_SUCCESS || formStatus === FORM_LOAD_SUCCESS) {
        return (
            <StatusIconBox>
                <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.8rem', color: 'green' }} />
            </StatusIconBox>
        );
    } else if (formStatus === FORM_SAVE_FAIL || formStatus === FORM_LOAD_FAIL) {
        return (
            <StatusIconBox>
                <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.8rem', color: 'red' }} />
            </StatusIconBox>
        );
    } else {
        return null;
    }
}

const createMessageUI = (formStatus) => {
    if (formStatus === FORM_INPUT_INVALID) {
        return (
            <FormMessage error>
                {INVALID_INPUT_MESSAGE}
            </FormMessage>
        );
    }
    else if (formStatus === FORM_SAVE_SUCCESS) {
        return (
            <FormMessage>
                {SAVE_SUCCESS_MESSAGE}
            </FormMessage>
        );
    } else if (formStatus === FORM_SAVE_FAIL) {
        return (
            <FormMessage error>
                {SAVE_FAIL_MESSAGE}
            </FormMessage>
        );
    } else if (formStatus === FORM_LOAD_SUCCESS) {
        return (
            <FormMessage>
                {LOAD_SUCCESS_MESSAGE}
            </FormMessage>
        );
    } else if (formStatus === FORM_LOAD_NOT_FOUND) {
        return (
            <FormMessage error>
                {LOAD_NOT_FOUND_MESSAGE}
            </FormMessage>
        );
    } else if (formStatus === FORM_LOAD_FAIL) {
        return (
            <FormMessage error>
                {LOAD_FAIL_MESSAGE}
            </FormMessage>
        );
    } else {
        return null;
    }

}


const LoadSaveControl = () => {

    const { planData, setPlanData } = useContext(AppContext);
    const { customUnitCourses, setCustomUnitCourses } = useContext(AppContext);

    const [isLoadSelected, setIsLoadSelected] = useState(true);
    const [currentButton, setCurrentButton] = useState('load');
    const [inputValue, setInputValue] = useState('');

    // loading, successful, failed
    const [formStatus, setFormStatus] = useState(null);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        if (isLoadSelected && currentButton === 'load') {
            // Load
            if (!isInputValid(inputValue)) return setFormStatus(FORM_INPUT_INVALID);

            setFormStatus(FORM_LOADING)
            const loadResult = await loadPlan(inputValue);
            
            if (loadResult.code === PLAN_LOADED) {
                setFormStatus(FORM_LOAD_SUCCESS);
                setPlanData(loadResult.planData);
                setCustomUnitCourses(loadResult.customUnits);
            } else if (loadResult.code === PLAN_LOAD_NOT_FOUND) {
                setFormStatus(FORM_LOAD_NOT_FOUND);
            } else if (loadResult.code === PLAN_LOAD_FAILED) {
                setFormStatus(FORM_LOAD_FAIL);
            }
            
        } else if (!isLoadSelected && currentButton === 'save') {
            // Save
            if (!isInputValid(inputValue)) return setFormStatus(FORM_INPUT_INVALID);

            setFormStatus(FORM_LOADING)
            const degreePlan = extractCourseIds(planData);
            const saveResult = await savePlan(inputValue, degreePlan, customUnitCourses); // returns bool for success/fail

            if (saveResult === PLAN_SAVED_NEW || saveResult === PLAN_SAVED_OLD) {
                setFormStatus(FORM_SAVE_SUCCESS);
            } else if (saveResult === PLAN_SAVED_FAILED) {
                setFormStatus(FORM_SAVE_FAIL);
            }
        }
    }

    let statusIconUI = createStatusIconUI(formStatus);
    let formMessageUI = createMessageUI(formStatus);


    return (
        <LoadSaveFormContainer>
            <LoadSaveForm onSubmit={onFormSubmit}>
                <TextInputContainer>
                    <TextInputBox>
                        <TextInput
                            type="text"
                            value={inputValue}
                            isFormValid={formStatus !== FORM_INPUT_INVALID}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setFormStatus(null);
                            }}
                            onClick={(e) => {
                                setFormStatus(null);
                            }}
                            placeholder="ex. student ID"
                        />
                        {formMessageUI}
                    </TextInputBox>

                    {statusIconUI}
                </TextInputContainer>

                <ToggleButtonContainer>
                    <ToggleButton
                        type="submit"
                        isSelected={isLoadSelected}
                        onClick={() => {
                            setIsLoadSelected(true);
                            setTimeout(() => setCurrentButton('load'), 0);
                            setFormStatus(null);
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
                            setFormStatus(null);
                        }}
                    >
                        Save
                        </ToggleButton>
                </ToggleButtonContainer>
            </LoadSaveForm>
        </LoadSaveFormContainer>
    );
}

export default LoadSaveControl;