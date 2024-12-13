import { AppThemeProvider } from "./contexts/ThemeContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./languages/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AppThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppThemeProvider>
);

reportWebVitals();
