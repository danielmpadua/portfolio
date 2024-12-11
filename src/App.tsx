import { AppContainer } from "./components/AppContainer";
import { HeaderMenu } from "./components/HeaderMenu";
import { Home } from "./pages/Home";

function App() {
  return (
    <AppContainer>
      <HeaderMenu />

      <Home />
    </AppContainer>
  );
}

export default App;
