import { AppContainer } from "./components/AppContainer";
import { HeaderMenu } from "./components/HeaderMenu";
import { BrowserRouter } from "react-router";
import { Router } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <HeaderMenu />
        <Router />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
