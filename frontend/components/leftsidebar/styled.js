import { text } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

const sideBarBgColor1 = "#213CB2";
const sideBarBgColor2 = "#0D2AAB";
const textColor = "#EAEAEA";
const searchFormBgColor = "#2850FF";
const searchResultBgColor = "#122782";
const clearButtonColor = "#95AFF4"


export const LeftSideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, ${sideBarBgColor1}, ${sideBarBgColor2});
    padding: 3rem 1.7rem;
`;

// Logo
export const LogoContainer = styled.div`
    background-color: ${searchResultBgColor};
    padding: 3rem;
`;

// CourseSearchForm

export const SearchFormContainer = styled.div`
    width: 100%;
    background-color: ${searchFormBgColor};
    padding: 1.2rem 1.7rem;
    border-radius: 20px;
    font-size: 1.4rem;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, .6);
`;

export const SearchForm = styled.form`

`;

export const FormFieldBox = styled.div`
    margin-bottom: .3rem;
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

export const dropdownErrorStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        minHeight: '3.5rem',
        height: '3.5rem',
        // border: '2px solid #EB6C6C',
        boxShadow: '0px 1px 3px 4px #EB6C6C',
    }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}

// SearchResultList
export const ResultListContainer = styled.div`
    margin-top: 3rem;
    padding: 1rem 3.3rem 3rem;
    background-color: ${searchResultBgColor};
    border-radius: 20px;
`;

export const ClearButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
`;

export const ClearButton = styled.a`
    display: inline-block;
    padding-top: .1rem;
    width: 3.6rem;
    height: 1.7rem;
    background-color: ${clearButtonColor};
    border-radius: 100px;
    text-align: center;
    font-size: 1.2rem;
    color: ${textColor};
    transition: all .3s;
    cursor: pointer;

    &:link,
    &:visited {
        text-decoration: none;
    }

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0px);
    }
`;

// AdditionalLinks

export const AdditionalLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    width: 100%;
    padding-left: 3.2rem;
`;

export const LinkBox = styled.div`
    margin-top: 1.2rem;
`;

export const IconLink = styled.a`

    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;

    &:link,
    &:visited {
        text-decoration: none;
    }
`;


export const SvgImage = styled.img`
    display: inline-block;
    width: 3.3rem;
`;

export const LinkText = styled.span`
    color: ${textColor};
    font-size: 1.8rem;
    letter-spacing: .4rem;
    padding-left: ${({paddingLeft}) => paddingLeft};
`;


export const gitHubIconStyle = {
    display: 'inline-block',
    fontSize: '3.3rem',
    color: '#EAEAEA',
}