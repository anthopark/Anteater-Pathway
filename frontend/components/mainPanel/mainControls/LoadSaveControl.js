import { useState } from 'react';
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

const LoadSaveControl = () => {
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