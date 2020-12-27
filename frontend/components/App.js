import { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import AppContextProvider from '@components/AppContextProvider';
import Page from '@components/Page';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const ModalBackground = styled(BaseModalBackground)`
  background-color: rgba(0,0,0,.8);
  animation: fadeIn .4s ease;
`;

const App = () => {
  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <AppContextProvider>
        <Page />
      </AppContextProvider>
    </ModalProvider>

  );
}

export default App;