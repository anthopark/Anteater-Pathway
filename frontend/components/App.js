import AppContextProvider from '@components/AppContextProvider';
import Page from '@components/Page';


const App = () => {
  return (
    <AppContextProvider>
      <Page />
    </AppContextProvider>
  );
}

export default App;