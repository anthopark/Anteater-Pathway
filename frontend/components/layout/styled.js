import styled from 'styled-components';

const desktopBreakPoint = '1240px';

export const PageContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 280px 4fr 1fr;
    @media (max-width: ${desktopBreakPoint}) {
        grid-template-columns: 280px 1fr 0fr;
    }
`;


export const LeftPanelContainer = styled.div`
    width: 100%;
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
