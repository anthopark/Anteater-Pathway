import styled from 'styled-components';

const desktopBreakPoint = '1200px';

export const PageContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 19% 66% 15%;
    @media (max-width: ${desktopBreakPoint}) {
        grid-template-columns: 25% 75% 0%;
    }
`;


export const LeftPanelContainer = styled.div`

`;

export const MainPanelContainer = styled.div`

`;

export const RightPanelContainer = styled.div`
    @media (max-width: ${desktopBreakPoint}) {
        display: none;
    }
`;
