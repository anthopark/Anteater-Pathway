import styled from 'styled-components';

const backgroundLGStartColor = "#F6F9FF";
const backgroundLGEndColor = "#EDF1FC"
const buttonColor = "#2850FF";
const textColor = "#EAEAEA";


// MainPanel

export const MainPanelContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.2rem 1.2rem;
`;

export const InnerBackgroundContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;
    background-image: linear-gradient(to right, ${backgroundLGStartColor}, ${backgroundLGEndColor});
    border-radius: 20px;
    
`;

// MainControls

export const MainControlsContainer = styled.div`
    width: 100%;
    height: 35px;
    display: grid;
    font-size: 1.4rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
`;


export const AddYearForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 5% 35%;
`;


export const LoadSaveFormBox = styled.div`
    width: 100%;
`;

export const MainControlButton = styled.button`
    background: none;
    border:none;
    padding: 0;
    cursor: pointer;
    outline: inherit;

    width: 100%;
    height: 3.5rem;
    border-radius: 100px;
    color: ${textColor};
    font-size: 1.5rem;
    letter-spacing: .1rem;
    background-color: ${buttonColor};

    box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, .4);
    transition: all .3s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, .3);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, .4);
    }
`

export const dropdownStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
        border: '1px solid #FEFEFE',
        boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, .4)',
    }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}

export const dropdownErrorStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
        // border: '2px solid #EB6C6C',
        boxShadow: '0px 0px 3px 3px #EB6C6C',
    }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}