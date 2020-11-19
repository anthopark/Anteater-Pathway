import styled from 'styled-components';

const sideBarBgColor1 = "#213CB2";
const sideBarBgColor2 = "#0D2AAB";

const textColor = "#EEEEEE";

const searchFormBgColor = "#2850FF";


export const LeftSideBarContainer = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, ${sideBarBgColor1}, ${sideBarBgColor2});
    padding: 3rem 1.5rem;
`;

export const SearchFormContainer = styled.div`
    width: 100%;
    background-color: ${searchFormBgColor};
    padding: 1.5rem 1.7rem;
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
    font-weight: 700;
    margin-bottom: .3rem;
`;

export const ThreeColumnGridBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 5% 35%; 
`;


export const FormTextInput = styled.input`
    height: 3.5rem;
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