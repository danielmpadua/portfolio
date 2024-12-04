import { Box } from "@mui/material";
import { APP_BAR_HEIGHT } from "../../components/HeaderMenu";
import { FooterAnimation } from "../../components/FooterAnimation";
import { LinkAggregator } from "../../components/LinkAggregator";

export const Home = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          width: "100%",
          top: APP_BAR_HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "56px",
          zIndex: 1,
        }}
      >
        <LinkAggregator />
      </Box>
      <FooterAnimation />
    </>
  );
};
