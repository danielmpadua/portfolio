import { Box } from "@mui/material";

export const CarouselNavigation = ({ icon }: { icon?: JSX.Element }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      padding: 0.5,
      marginX: 1,
      border: "2px solid rgba(255, 255, 255, 0.7)",
      color: "whitesmoke",
      background: "rgba(0, 0, 0, 0.2)",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.4)",
        border: `2px solid white`,
        color: "white",
      },
    }}
  >
    {icon}
  </Box>
);
