import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./contexts/ThemeContext";
import { DEFAULT_LANGUAGE } from "./languages/i18n";
import { AnimatedHeader } from "./components/AnimatedHeader";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

import "./App.css";

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HandymanOutlinedIcon
          sx={{
            height: 200,
            width: 200,
            color: isLightMode ? "grey" : "#426274",
          }}
        />

        <Typography variant="h2" color={isLightMode ? "grey" : "#426274"}>
          {t("under_construction")}
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
