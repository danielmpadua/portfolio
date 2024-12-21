import { Box, useTheme } from "@mui/material";
import { useLocation } from "react-router";
import { useThemeContext } from "../../contexts/ThemeContext";

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { isLightMode } = useThemeContext();

  const setCustomBackgroudColor = () => {
    if (pathname === "/" && !isLightMode) return "#0E1418";
    if (pathname === "/" && isLightMode) return "#19B6F7";
    return undefined;
  };

  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
        position: "relative",
        overflow: "hidden",
        background:
          setCustomBackgroudColor() || theme.palette.background.default,
        width: "100dvw",
        height: "100dvh",
      }}
    >
      {children}
    </Box>
  );
};
