import { AppBar, Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { ThemeSwitch } from "../ThemeSwitch";

export const APP_BAR_HEIGHT = 52;

export const HeaderMenu = () => {
  const { isLightMode, changeThemeMode } = useThemeContext();

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const countries = ["BR", "US"];

  const [country, setCountry] = useState<string>(
    language === "en" ? countries[1] : countries[0]
  );

  return (
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
            localStorage.setItem("language", newLanguage);
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
  );
};
