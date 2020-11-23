import Select from 'react-select';
import { useEffect, useContext } from 'react';

import { AppContext } from '@components/AppContextProvider';

import { 
    MainControlsContainer,
    AddYearForm,
    LoadSaveFormBox,
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

const MainControls = () => {
    const { yearOptions, setYearOptions} = useContext(AppContext);

    useEffect(() => {
        setYearOptions(generateYearOptions(15, 30));
    }, [])

    return ( 
        <MainControlsContainer>
            <AddYearForm>
                <Select 
                    instanceId='addYear'
                    options={yearOptions}
                    styles={dropdownStyle}
                />
                <div></div>
                <MainControlButton type="submit">
                    Add
                </MainControlButton>
            </AddYearForm>
            <div></div>
            <div></div>
            <LoadSaveFormBox>

            </LoadSaveFormBox>
            
        </MainControlsContainer>
     );
}
 
export default MainControls;