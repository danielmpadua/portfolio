import { Box, Button, Typography } from "@mui/material";
import { FooterAnimation } from "../../components/FooterAnimation";
import { PixelBubble } from "../../components/PixelBubble";
import { APP_BAR_HEIGHT } from "../../components/HeaderMenu";
import { useTranslation } from "react-i18next";
import { ANIMATIONS } from "../../hooks/useDaniAnimation";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const { t } = useTranslation();
  const { isLightMode } = useThemeContext();
  const navigate = useNavigate();
  const scale = 5;

  return (
    <Box>
      <Box
        sx={{
          height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          position: "absolute",
          gap: 4,
        }}
      >
        <Box
          sx={{
            padding: "8px 16px",
            background: isLightMode ? "#41b0a0" : "#426274",
            borderRadius: "24px",
            opacity: 0.9,
          }}
        >
          <Typography variant="h1" color="whitesmoke">
            404
          </Typography>
        </Box>
        <PixelBubble
          right
          content={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" fontFamily="Pixelify+Sans" margin={1}>
                {t("page_not_found")}
              </Typography>
              <Box sx={{ width: "fit-content" }}>
                <Button
                  variant="contained"
                  sx={{
                    mb: 1,
                    background: isLightMode ? "#41b0a0" : "#426274",
                  }}
                  onClick={() => navigate("/")}
                >
                  {t("return_home_screen")}
                </Button>
              </Box>
            </Box>
          }
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 25 * scale,
            right: `calc(50% - ${46 * (scale || 1)}px)`,
          }}
        >
          <PixelBubble
            content={
              <Typography variant="h6" fontFamily="Pixelify+Sans" margin={1}>
                {t("au au!")}
              </Typography>
            }
          />
        </Box>
      </Box>

      <FooterAnimation scale={scale} filterAnimations={[ANIMATIONS.IDLE2]} />
    </Box>
  );
};
