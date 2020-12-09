import styled from 'styled-components';


const backgroundLGStartColor = "#F6F9FF";
const backgroundLGEndColor = "#EDF1FC"

const scrollBarColor = "#C3C3C3"
const scrollBarHoverColor = "#A2A7B9"


// MainPanel

export const MainPanelContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding: 1.2rem 1.2rem;
    /* overflow: hidden; */
`;

export const InnerBackgroundContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;
    background-image: linear-gradient(to right, ${backgroundLGStartColor}, ${backgroundLGEndColor});
    border-radius: 20px;
    
`;

export const AcademicYearsBox = styled.div`
    /* max-height: 100px; */
    /* overflow-y: scroll; */
    max-height: 90%;
    overflow: auto;

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




