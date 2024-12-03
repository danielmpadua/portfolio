import { Box } from "@mui/material";

export const AppContainer = ({
  children,
  isLightMode,
}: {
  children: React.ReactNode;
  isLightMode: boolean;
}) => (
  <Box
    sx={{
      padding: 0,
      margin: 0,
      position: "relative",
      overflow: "hidden",
      background: isLightMode ? "#19B6F7" : "#0E1418",
      width: "100dvw",
      height: "100dvh",
    }}
  >
    {children}
  </Box>
);
