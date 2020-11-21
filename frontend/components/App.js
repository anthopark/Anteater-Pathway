import AppContextProvider from '@components/AppContextProvider';
import {
  PageContainer,
  LeftPanelContainer,
  MainPanelContainer,
  RightPanelContainer,
} from '@components/layout'
import LeftSideBar from '@components/leftsidebar';

const App = () => {
  return (
    <AppContextProvider>
      <PageContainer>
        <LeftPanelContainer>
          <LeftSideBar />
        </LeftPanelContainer>
        <MainPanelContainer>
          Main Panel
        </MainPanelContainer>
        <RightPanelContainer>
          Right Panel
        </RightPanelContainer>
      </PageContainer>
    </AppContextProvider>
  );
}

export default App;