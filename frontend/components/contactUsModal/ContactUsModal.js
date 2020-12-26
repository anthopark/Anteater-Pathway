import Modal from 'styled-react-modal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import ContactUsButton from './ContactUsButton';
import ContactUsForm from './ContactUsForm';
import contactUsData from '@data/contact-us-data.json';

import {
    ModalHeader,
    LogoImage,
    TitleHeading,
    VersionText,
    GreetingText,
    FormBox,
    ModalFooter,
    FooterText,
    NameLink,
    ContributeLink,
    IconText,
    ModalActionBox,
    ModalButton,
} from './styled';

const StyledModal = Modal.styled`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: Oxygen;
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
                onEscapeKeydown={toggleModal}
            >
                <ModalHeader>
                    <LogoImage src='/logo-only-icon.svg' />
                    <TitleHeading>Anteater Pathway</TitleHeading>
                    <VersionText>v{contactUsData.version}</VersionText>
                    <GreetingText>{contactUsData.greeting}</GreetingText>
                </ModalHeader>
                <FormBox>
                    <ContactUsForm />
                </FormBox>
                <ModalFooter>
                    <FooterText>
                        Designed and created with ❤️ by
                        <NameLink href='https://github.com/emilyPhee' target='_blank'>Emily Phee</NameLink>
                         &
                        <NameLink href='https://github.com/anthopark' target='_blank'>Anthony Park</NameLink>
                    </FooterText>
                    <ContributeLink href='https://github.com/anthopark/Anteater-Pathway' target='_blank'>
                        <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2.7rem' }} />
                        <IconText>Contribute</IconText>
                    </ContributeLink>
                </ModalFooter>
                <ModalActionBox>
                    <ModalButton color='close' onClick={toggleModal}>Close</ModalButton>
                </ModalActionBox>
            </StyledModal>
        </>
    );
}