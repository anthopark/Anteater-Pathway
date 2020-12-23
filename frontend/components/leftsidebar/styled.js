import styled from 'styled-components';

const sideBarBgColor1 = "#213CB2";
const sideBarBgColor2 = "#0D2AAB";
const textColor = "#EAEAEA";
const logoRegularColor = "#DEDEDE";
const logoEmphasisColor = "#E47B00";
const searchFormBgColor = "#2850FF";
const searchResultBgColor = "#122782";
const clearButtonColor = "#95AFF4"
const placeHolderTextColor = "#747474";

const scrollBarColor = "#775E7B"
const scrollBarHoverColor = "#9D7DA3"


export const LeftSideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, ${sideBarBgColor1}, ${sideBarBgColor2});
    padding: 3rem 2.2rem;
`;

// Logo
export const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
`;


export const LogoImage = styled.img`
    width: 20rem;
`;

export const LogoHeading = styled.h1`
    padding-top: .3rem;
    display: block;
    width: 100%;
    font-family: 'Concert One', cursive;
    letter-spacing: .1rem;
    font-size: 2.5rem;
    text-transform: uppercase;
    `;

export const LogoTextSpan = styled.span`
    display: block;
    text-align: ${({ align }) => (align)};
    color: ${({ emphasis }) => (emphasis ? logoEmphasisColor : logoRegularColor)};
    margin-bottom: 1rem;
`;

// CourseSearchForm

export const SearchFormContainer = styled.div`
    width: 100%;
    background-color: ${searchFormBgColor};
    padding: 1.2rem 1.7rem;
    border-radius: 20px;
    font-size: 1.5rem;
    /* box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, .6); */
`;

export const SearchForm = styled.form`

`;

export const FormFieldBox = styled.div`
    margin-bottom: .4rem;
`;

export const FormLabel = styled.label`
    display: inline-block;
    color: ${textColor};
    margin-bottom: .3rem;
    letter-spacing: .1rem;
    font-weight: 700;
`;

export const optionalSpanStyle = {
    letterSpacing: '0',
    fontSize: '1.3rem',
    fontWeight: '400',
}

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
        border: 1px solid dodgerblue; 
    }

    ::placeholder {
        color: ${placeHolderTextColor};
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
        border: 'transparent',
        boxShadow: '0px 0px 4px 3px #EB6C6C',
    }),

    clearIndicator: (provided) => ({
        ...provided,
        paddingRight: '4px',
    }),
}

// SearchResultList
export const SearchResultContainer = styled.div`
    margin-top: 3rem;
    padding: 1rem 1.7rem 3rem 3.3rem;
    background-color: ${searchResultBgColor};
    border-radius: 20px;
`;

export const ClearButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 1.8rem;
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

export const ResultMessageBox = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-left: .2rem;
    color: ${textColor};
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: .1rem;
`;

export const LoadingIconBox = styled.div`
    color: ${textColor};
`;


export const ResultMessageText = styled.span`
    display: inline-block;
    margin-left: 1rem;
`;


export const ResultListBox = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 35.5rem;
    overflow-y: auto;
    padding: .3rem 0;

    scrollbar-color: ${scrollBarColor} transparent;
    scrollbar-width: thin;
    scrollbar-face-color: ${scrollBarHoverColor};

    ::-webkit-scrollbar {
        width: .8rem;
        margin-left: .5rem;
    }
    

    ::-webkit-scrollbar-thumb {
        
        background-color: ${scrollBarColor};
        border-radius: 20px;
        margin-left: .5rem;
    }


    ::-webkit-scrollbar-thumb:hover {
        background-color:${scrollBarHoverColor};
        margin-left: .5rem;
        
    }

    ::-webkit-scrollbar-button {
        display:none;
    }
`;

// AdditionalLinks
export const AdditionalLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    width: 100%;
    padding: 0 3.6rem;
`;

export const LinkBox = styled.div`
    margin-top: 1.5rem;
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
    width: 3.1rem;
`;

export const LinkText = styled.span`
    color: ${textColor};
    font-size: 1.6rem;
    letter-spacing: .3rem;
    padding-left: ${({ paddingLeft }) => paddingLeft};
`;


export const gitHubIconStyle = {
    display: 'inline-block',
    fontSize: '3.1rem',
    color: '#EAEAEA',
}