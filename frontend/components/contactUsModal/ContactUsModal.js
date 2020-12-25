import Modal from 'styled-react-modal';
import { useState } from 'react';

import ContactUsButton from './ContactUsButton';

const StyledModal = Modal.styled`
    width: 60rem;
    height: 60rem;
    color: #EAEAEA;
    border: 1px solid #EAEAEA;
`;

export const ContactUsModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <ContactUsButton handleClick={toggleModal} />
            <StyledModal
                isOpen={isOpen}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
            >
                fuk
            </StyledModal>
        </>
    );
}