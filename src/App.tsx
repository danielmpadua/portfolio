import { Box, Button } from "@mui/material";
import "./App.css";

import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./contexts/ThemeContext";
import { DEFAULT_LANGUAGE } from "./languages/i18n";
import { AnimatedHeader } from "./components/AnimatedHeader";

function App() {
  const { isLightMode, changeThemeMode } = useContext(ThemeContext);
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(sessionStorage.getItem("language") || DEFAULT_LANGUAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: isLightMode ? "#FBFBFB" : "#282c34",
        minHeight: "100vh",
        padding: 0,
      }}
    >
      <AnimatedHeader />
      <Button onClick={changeThemeMode}>
        {isLightMode ? t("light_theme") : t("dark_theme")}
      </Button>
      <Button
        onClick={() => {
          const newLanguage = language === "pt" ? "en" : "pt";
          changeLanguage(newLanguage);
          sessionStorage.setItem("language", newLanguage);
        }}
      >
        {t("change_language")}
      </Button>
    </Box>
  );
}

export default App;
