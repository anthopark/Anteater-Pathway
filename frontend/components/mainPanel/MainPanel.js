import MainControls from './mainControls/';

import {
    MainPanelContainer,
    InnerBackgroundContainer,
} from './styled';

export const MainPanel = () => {
    return (
        <MainPanelContainer>
            <InnerBackgroundContainer>
                <MainControls />
            </InnerBackgroundContainer>
        </MainPanelContainer>
    );
}