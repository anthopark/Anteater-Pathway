import { MainControlButton, StyledPopup } from './styled';


const PopupButton = ({ buttonText }) => {
    return (
        <StyledPopup
            trigger={<MainControlButton> {buttonText} </MainControlButton>}
            closeOnDocumentClick
        >
            displaytext
        </StyledPopup>
    );
}

export default PopupButton;