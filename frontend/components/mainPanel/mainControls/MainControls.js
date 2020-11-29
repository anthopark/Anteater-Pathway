import AddYearControl from './AddYearControl';
import LoadSaveControl from './LoadSaveControl';

import {
    MainControlsContainer,
} from './styled';


export const MainControls = ({ addAcademicYear }) => {
    return (
        <MainControlsContainer>
            <AddYearControl addAcademicYear={addAcademicYear} />
            <div></div>
            <div></div>
            <LoadSaveControl />
        </MainControlsContainer>
    );
}
