import { AppContainer } from "./components/AppContainer";
import { HeaderMenu } from "./components/HeaderMenu";
import { HashRouter } from "react-router";
import { Router } from "./routes";

function App() {
  return (
    <HashRouter>
      <AppContainer>
        <HeaderMenu />
        <Router />
      </AppContainer>
    </HashRouter>
  );
}

export default App;
