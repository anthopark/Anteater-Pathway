import AddYearControl from './AddYearControl';
import LoadSaveControl from './LoadSaveControl';

import { 
    MainControlsContainer,
 } from './styled';


export const MainControls = () => {
    return ( 
        <MainControlsContainer>
            <AddYearControl />
            <div></div>
            <div></div>
            <LoadSaveControl />
        </MainControlsContainer>
     );
}
