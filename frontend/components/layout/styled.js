import styled from 'styled-components';

const desktopBreakPoint = '1200px';

export const PageContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: auto 3.3fr 1fr;
    @media (max-width: ${desktopBreakPoint}) {
        grid-template-columns: auto 1fr 0fr;
    }
`;


export const LeftPanelContainer = styled.div`
    width: 280px;
    max-width: 280px;
    min-width: 280px;
`;

export const MainPanelContainer = styled.div`
    width: 100%;
`;

export const RightPanelContainer = styled.div`
    width: 100%;
    @media (max-width: ${desktopBreakPoint}) {
        display: none;
    }
`;
