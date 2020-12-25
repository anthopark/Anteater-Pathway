import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import {
    ContactUsButtonContainer,
    LinkText,
    envelopeIconStyle,
} from './styled';

const ContactUsButton = ({ handleClick }) => {
    return (
        <ContactUsButtonContainer onClick={handleClick}>
            <FontAwesomeIcon icon={faEnvelope} style={envelopeIconStyle} />
            <LinkText paddingLeft={'1.7rem'}>
                Contact us
            </LinkText>
        </ContactUsButtonContainer>
    );
}

export default ContactUsButton;