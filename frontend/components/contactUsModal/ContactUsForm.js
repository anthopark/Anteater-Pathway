import Select from 'react-select';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { submitFeedBack, CONTACT_API_CODE } from '@api/contact';
import contactUsData from '@data/contact-us-data.json';

import {
    ContactUsFormContainer,
    MessageForm,
    FormFieldBox,
    FormLabel,
    dropdownStyle,
    dropdownErrorStyle,
    FormTextArea,
    FormActionBox,
    ModalButton,
    StatusIconBox,
    FormStatusMessage,
} from './styled';

const FORM_READY = 0;
const FORM_LOADING = 1;
const FORM_SUCCESS = 2;
const FORM_FAILED = 3;

const ContactUsForm = () => {

    const [optionValue, setOptionValue] = useState();
    const [messageValue, setMessageValue] = useState();
    const [isSelectInvalid, setIsSelectInvalid] = useState(false);
    const [isMessageInvalid, setIsMessageInvalid] = useState(false);
    const [formStatus, setFormStatus] = useState(FORM_READY);
    const reRef = useRef();


    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!optionValue) return setIsSelectInvalid(true);
        if (!messageValue) return setIsMessageInvalid(true);

        const token = await reRef.current.executeAsync();
        reRef.current.reset();

        setFormStatus(FORM_LOADING);
        const contactResult = await submitFeedBack(optionValue, messageValue, token);
        if (contactResult === CONTACT_API_CODE.SUCCESS) {
            setFormStatus(FORM_SUCCESS);
        } else {
            setFormStatus(FORM_FAILED);
        }
    };

    let contactFormUI;

    if (formStatus === FORM_READY) {
        contactFormUI = (
            <MessageForm onSubmit={onFormSubmit}>
                <FormFieldBox>
                    <FormLabel>Topics:</FormLabel>
                    <Select
                        instanceId='issue'
                        styles={isSelectInvalid ? dropdownErrorStyle : dropdownStyle}
                        options={contactUsData.issueOptions}
                        onChange={e => { setOptionValue(e); setIsSelectInvalid(false) }}
                        placeholder="Select a related topic..."
                        value={optionValue}
                        isClearable
                    />
                </FormFieldBox>
                <FormFieldBox>
                    <FormLabel>Message:</FormLabel>
                    <FormTextArea
                        isInvalid={isMessageInvalid}
                        value={messageValue}
                        onChange={e => { setMessageValue(e.target.value); setIsMessageInvalid(false); }}
                    />
                </FormFieldBox>
                <FormActionBox>
                    <ModalButton color='send' type='submit'>Send</ModalButton>
                </FormActionBox>

                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    size='invisible'
                    ref={reRef}
                />
            </MessageForm>
        );
    } else if (formStatus === FORM_LOADING) {
        contactFormUI = (
            <StatusIconBox>
                <FontAwesomeIcon icon={faSpinner} style={{ 'fontSize': '2.7rem', 'color': '#EAEAEA' }} spin />
            </StatusIconBox>
        );

    } else if (formStatus === FORM_SUCCESS) {
        contactFormUI = (
            <StatusIconBox>
                <FontAwesomeIcon icon={faCheck} style={{ 'fontSize': '2.7rem', 'color': '#54F03A' }} />
                <FormStatusMessage>Thank you for your input!</FormStatusMessage>
            </StatusIconBox>
        )

    } else if (formStatus === FORM_FAILED) {
        contactFormUI = (
            <StatusIconBox>
                <FontAwesomeIcon icon={faTimes} style={{ 'fontSize': '2.7rem', 'color': '#E56161' }} />
                <FormStatusMessage>Something went wrong :(</FormStatusMessage>
            </StatusIconBox>
        );

    }

    return (
        <ContactUsFormContainer>
            {contactFormUI}
        </ContactUsFormContainer>
    );
}

export default ContactUsForm;

