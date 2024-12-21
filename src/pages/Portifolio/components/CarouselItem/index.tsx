import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { TProject } from "../Projects";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const CarouselItem = (project: TProject) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        m: 1,
        height: 150,
        background: project?.image
          ? `url(${project?.image}) no-repeat center/cover`
          : "whitesmoke",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <CardActionArea
        onClick={() => (project?.tab ? navigate(project?.tab) : {})}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          WebkitBackdropFilter: "blur(1px)",
          backdropFilter: "blur(1px)",
          background: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            WebkitBackdropFilter: "none",
            backdropFilter: "none",
            background: "rgba(0, 0, 0, 0)",
          },
        }}
      >
        {project?.news && (
          <Box
            sx={{
              background: "rgba(180, 50, 50, 0.9)",
              padding: "4px 8px",
              borderRadius: "8px",
              position: "absolute",
              top: 4,
              right: 4,
            }}
          >
            <Typography
              variant="caption"
              fontFamily="Inter"
              sx={{ color: "whitesmoke" }}
            >
              {t("new")}
            </Typography>
          </Box>
        )}

        {project?.name && (
          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.8)",
              borderRadius: "12px",
              padding: "4px 8px",
            }}
          >
            <Typography
              variant="body1"
              fontFamily="Inter"
              sx={{ color: "whitesmoke" }}
            >
              {t(project?.name).toUpperCase()}
            </Typography>
          </Box>
        )}

        {!project?.name && <ConstructionRoundedIcon fontSize="large" />}
        {!project?.name && t("under_construction")}
      </CardActionArea>
    </Card>
  );
};
