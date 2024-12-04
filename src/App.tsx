import { Box, Typography } from "@mui/material";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { useDanielAnimation } from "./hooks/useDaniAnimation";
import { useScreenSize } from "./hooks/useScreenSize";
import { AppContainer } from "./components/AppContainer";
import { FooterAnimation } from "./components/FooterAnimation";
import { APP_BAR_HEIGHT, HeaderMenu } from "./components/HeaderMenu";
import { useTranslation } from "react-i18next";

function App() {
  const { width } = useScreenSize();
  const { animationHeight } = useDanielAnimation({ width });
  const { t } = useTranslation();

  return (
    <AppContainer>
      <HeaderMenu />

      <Box
        sx={{
          height: `calc(100% - ${animationHeight + APP_BAR_HEIGHT}px)`,
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
            height: width < 720 ? 80 : 150,
            width: width < 720 ? 80 : 150,
            color: "#426274",
          }}
        />

        <Typography
          variant={width < 720 ? "h6" : "h3"}
          fontFamily="Pixelify Sans"
          fontWeight={700}
          color={"#426274"}
        >
          {t("under_construction").toUpperCase()}
        </Typography>
      </Box>

      <FooterAnimation />
    </AppContainer>
  );
}

export default App;
