import styled from 'styled-components';

const backgroundLGStartColor = "#F6F9FF";
const backgroundLGEndColor = "#EDF1FC"

export const MainPanelContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.2rem 1.2rem;
`;

export const InnerBackgroundContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, ${backgroundLGStartColor}, ${backgroundLGEndColor});
    border-radius: 20px;
`;
