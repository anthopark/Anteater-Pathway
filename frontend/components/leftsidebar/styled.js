import styled from 'styled-components';

const sideBarBgColor1 = "#213CB2";
const sideBarBgColor2 = "#0D2AAB";

const textColor = "#EEEEEE";

const searchFormBgColor = "#2850FF";


export const LeftSideBarContainer = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, ${sideBarBgColor1}, ${sideBarBgColor2});
    padding: 3rem 1.7rem;
`;

export const SearchFormContainer = styled.div`
    width: 100%;
    background-color: ${searchFormBgColor};
    padding: 1.2rem 1.7rem;
    border-radius: 20px;
    font-size: 1.4rem;
`;

export const SearchForm = styled.form`

`;

export const FormFieldBox = styled.div`
    margin-bottom: .5rem;
`;

export const FormLabel = styled.label`
    display: inline-block;
    color: ${textColor};
    margin-bottom: .3rem;
`;

export const ThreeColumnGridBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 5% 35%; 
`;


export const FormTextInput = styled.input`
    height: 3.2rem;
    padding: .5rem 1rem;
    margin: 0 0;
    border-radius: 10px;
    outline: none;
    border: transparent;
    transition: .3s;
    
    &:focus {
        border: 2px solid dodgerblue; 
    }

    ::placeholder {
        opacity: .8;
    }
`;

export const SearchButton = styled.button`
    background: none;
    border:none;
    padding: 0;
    cursor: pointer;
    outline: inherit;

    width: 100%;
    font-weight: 700;
    font-size: 1.7rem;
    letter-spacing: .2rem;
    border-radius: 10px;
    color: ${textColor};
    background: linear-gradient(135deg, #F08D61, #EA6226);
`;

export const FormErrorBox = styled.div`
    border: 1px solid #EB6C6C;
    border-radius: 7px;
    color: #D14646;
    font-size: 1.4rem;
    /* font-weight: 700; */
    text-align: center;
    background-color: #F6C8C8;
    padding: .2rem;
    margin-top: .6rem;
`;

export const dropdownStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
    }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}