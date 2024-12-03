import { AppBar, Box, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./contexts/ThemeContext";
import { DEFAULT_LANGUAGE } from "./languages/i18n";
import { AnimatedFooter } from "./components/AnimatedFooter";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { useDanielAnimation } from "./hooks/useDaniAnimation";
import { useScreenSize } from "./hooks/useScreenSize";
import { AppContainer } from "./components/AppContainer";

function App() {
  const { isLightMode, changeThemeMode } = useContext(ThemeContext);
  const { width } = useScreenSize();
  const { animationHeight } = useDanielAnimation({ width });

  const countries = ["BR", "US"];

  const [country, setCountry] = useState<string>(countries[0]);
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(sessionStorage.getItem("language") || DEFAULT_LANGUAGE);
    setCountry(
      sessionStorage.getItem("language") === "en" ? countries[1] : countries[0]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContainer isLightMode={isLightMode}>
      <AppBar
        position="static"
        sx={{
          background: isLightMode ? "#41b0a0" : "#426274",
          borderBottom: `2px solid ${isLightMode ? "#177864" : "#244955"}`,
          zIndex: 3,
          padding: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Typography>{t("change_language")}:</Typography>

          <Select
            value={country}
            inputProps={{
              sx: {
                padding: "5px 12px 3px 12px",
                margin: 0,
                background: "white",
              },
            }}
            onChange={(e) => {
              const newLanguage = e.target.value === "BR" ? "pt" : "en";
              changeLanguage(newLanguage);
              sessionStorage.setItem("language", newLanguage);
              setCountry(
                countries.find((c) => c === e.target.value) || countries[0]
              );
            }}
          >
            {countries.map((ctr) => (
              <MenuItem key={ctr} value={ctr}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <img
                    loading="lazy"
                    style={{ width: 20 }}
                    srcSet={`https://flagcdn.com/w40/${ctr.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w40/${ctr.toLowerCase()}.png`}
                    alt={ctr}
                  />
                  <Typography>{ctr}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>

          <ThemeSwitch
            checked={!isLightMode}
            onChange={() => changeThemeMode()}
          />
        </Box>
      </AppBar>

      <Box
        sx={{
          height: `calc(100% - ${animationHeight}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 1,
        }}
      >
        <HandymanOutlinedIcon
          sx={{
            height: 150,
            width: 150,
            color: "#426274",
          }}
        />

        <Typography
          variant="h3"
          fontFamily="Pixelify Sans"
          fontWeight={700}
          color={"#426274"}
        >
          {t("under_construction").toUpperCase()}
        </Typography>
      </Box>

      <AnimatedFooter />
    </AppContainer>
  );
}

export default App;
