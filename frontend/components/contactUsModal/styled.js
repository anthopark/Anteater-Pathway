import styled from 'styled-components';

const textColor = "#EAEAEA";


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