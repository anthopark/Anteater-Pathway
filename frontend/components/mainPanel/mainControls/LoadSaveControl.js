import { useState } from 'react';
import {
    LoadSaveForm,
    TextInput,
    ToggleButtonContainer,
    ToggleButton,
} from './styled';

const LoadSaveControl = () => {
    const [isLoadSelected, setIsLoadSelected] = useState(true);
    const [currentButton, setCurrentButton] = useState('load');
    const [inputValue, setInputValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);


    const onFormSubmit = (e) => {
        e.preventDefault();

        if (isLoadSelected && currentButton === 'load') {
            // Load
            if (!inputValue) return setIsFormValid(false);
            console.log('load', inputValue);
        } else if (!isLoadSelected && currentButton === 'save') {
            // Save
            if (!inputValue) return setIsFormValid(false);
            console.log('save', inputValue);
        }
    }

    return (
        <LoadSaveForm onSubmit={onFormSubmit}>
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
    );
}

export default LoadSaveControl;