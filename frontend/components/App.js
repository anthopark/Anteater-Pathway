import AppContextProvider from '@components/AppContextProvider';
import LeftSideBar from '@components/leftsidebar';
import MainPanel from '@components/mainPanel';

import {
  PageContainer,
  LeftPanelContainer,
  MainPanelContainer,
  RightPanelContainer,
} from '@components/layout'



const App = () => {
  return (
    <AppContextProvider>
      <PageContainer>
        <LeftPanelContainer>
          <LeftSideBar />
        </LeftPanelContainer>
        <MainPanelContainer>
          <MainPanel />
        </MainPanelContainer>
        <RightPanelContainer>
          Right Panel
        </RightPanelContainer>
      </PageContainer>
    </AppContextProvider>
  );
}

export default App;