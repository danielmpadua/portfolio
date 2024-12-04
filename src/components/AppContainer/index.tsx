import { Box, useTheme } from "@mui/material";

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
        position: "relative",
        overflow: "hidden",
        background: theme.palette.background.default,
        width: "100dvw",
        height: "100dvh",
      }}
    >
      {children}
    </Box>
  );
};
