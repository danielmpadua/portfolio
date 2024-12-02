import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./contexts/ThemeContext";
import { DEFAULT_LANGUAGE } from "./languages/i18n";
import { AnimatedFooter } from "./components/AnimatedFooter";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

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
        width: "100%",
        background: isLightMode
          ? "linear-gradient(180deg, rgba(82,204,255,1) 19%, rgba(25,182,247,1) 70%)"
          : "linear-gradient(0deg, rgba(40,59,70,1) 19%, rgba(14,20,24,1) 70%)",
        height: "100vh", // vh fallback
        // @ts-ignore
        height: "100dvh",
        padding: 0,
        margin: 0,
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={changeThemeMode}
          sx={{ width: "fit-content", background: "#426274" }}
        >
          {isLightMode ? t("dark_theme") : t("light_theme")}
        </Button>
        <Button
          sx={{ width: "fit-content", background: "#426274" }}
          variant="contained"
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
              color: "#426274",
            }}
          />

          <Typography variant="h2" color={"#426274"}>
            {t("under_construction")} :)
          </Typography>
        </Box>
      </Box>

      <AnimatedFooter />
    </Box>
  );
}

export default App;
