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

        if (!inputValue) return setIsFormValid(false);

        if (isLoadSelected && currentButton === 'load') {
            // Load
            console.log('load', inputValue);
        } else if (!isLoadSelected && currentButton === 'save') {
            // Save
            console.log('save', inputValue);
        }
    }

    return (
        <LoadSaveForm onSubmit={onFormSubmit}>
            <TextInput
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsFormValid(true);
                }}
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