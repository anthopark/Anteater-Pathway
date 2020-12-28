import styled, {css, keyframes} from 'styled-components';

const textColor = "#EAEAEA";

// ContactUsButton

export const ContactUsButtonContainer = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;
`;

export const LinkText = styled.span`
    color: ${textColor};
    font-size: 1.6rem;
    letter-spacing: .3rem;
    padding-left: ${({ paddingLeft }) => paddingLeft};
`;


export const envelopeIconStyle = {
    display: 'inline-block',
    fontSize: '2.9rem',
    color: '#EAEAEA',
}

// ContactUsModal

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${textColor};

`;


export const LogoImage = styled.img`
    display: block;
    height: 8rem;
`;

export const TitleHeading = styled.h1`
    display: block;
    font-size: 2.7rem;
    margin-top: 2.5rem;
    letter-spacing: .5rem;
    text-align: center;
`;

export const VersionText = styled.span`
    display: block;
    font-size: 2rem;
    letter-spacing: .3rem;
    margin-top: 3rem;
    text-align: center;
`;

export const GreetingText = styled.span`
    display: block;
    font-size: 2rem;
    margin-top: 2.5rem;
    text-align: center;
    letter-spacing: .1rem;
`;

export const FormBox = styled.div`
    margin-top: 5rem;
    display: flex;
    justify-content: center;
`;


export const ModalFooter = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FooterText = styled.p`
    color: ${textColor};
    letter-spacing: .1rem;
    font-size: 1.8rem;
    text-align: center;
`;

export const NameLink = styled.a`
    display: inline-block;
    margin: 0 .5rem;
    color: #1D88EA;
    cursor: pointer;
    &:link,
    &:visited {
        text-decoration: none;
    }
`;

export const ContributeLink = styled.a`
    display: flex;
    margin-top: 2rem;
    color: #DD3198;
    align-items: center;
    cursor: pointer;

    &:link,
    &:visited {
        text-decoration: none;
    }
`

export const IconText = styled.p`
    margin: 0 1rem;
    padding: 0;
    letter-spacing: .1rem;
    font-size: 1.8rem;
`;

export const ModalActionBox = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;


// ContactUsForm

export const ContactUsFormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27rem;
    height: 24.9rem;
`;

export const MessageForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormFieldBox = styled.div`
    margin-bottom: 1.2rem;
`;


export const FormLabel = styled.label`
    display: block;
    font-size: 1.7rem;
    letter-spacing: .1rem;
    margin-bottom: .7rem;
    color: ${textColor};

`;

export const dropdownStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
        fontSize: '1.5rem',
        color: '#000'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1.5rem'
      }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}

export const dropdownErrorStyle = {
    ...dropdownStyle,
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
        border: 'transparent',
        fontSize: '1.5rem',
        boxShadow: '0px 1px 4px 3px #EB6C6C',
    }),
    
}

export const FormTextArea = styled.textarea`
    width: 100%;
    height: 12rem;
    border-radius: 10px;
    font-size: 1.6rem;
    padding: 1rem 1rem;
    font-family: oxygen;

    ${({isInvalid}) => isInvalid ?
    css`
        border: transparent;
        box-shadow: 0px 1px 4px 3px #EB6C6C;`
    : ''}

    &:focus {
        outline: none;
    }
`;

export const FormActionBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const buttonColors = {
    'send': '#54F03A',
    'close': '#E56161'
}

export const ModalButton = styled.button`
    background-color: transparent;
    border: 2px solid ${({color}) => buttonColors[color]};
    color: ${({color}) => buttonColors[color]};
    border-radius: 5px;
    padding: .6rem 1.6rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    letter-spacing: .1rem;
    font-size: 1.4rem;

    -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    &:hover, &:focus {
        outline: 0;
        box-shadow: 0 0 40px 40px ${({color}) => buttonColors[color]} inset;
        color: rgba(0,0,0,.8);
    }

`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const StatusIconBox = styled.div`
    animation: ${fadeIn} 1s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

export const FormStatusMessage = styled.p`
    font-size: 2rem;
    letter-spacing: .1rem;
    color: ${textColor};
    margin: 1rem;
`;

