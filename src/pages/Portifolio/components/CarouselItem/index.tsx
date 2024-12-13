import { Button, Card } from "@mui/material";
import { TProject } from "../Projects";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { useTranslation } from "react-i18next";

export const CarouselItem = (project: TProject) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        m: 1,
        height: 150,
        opacity: 0.8,
        background: "whitesmoke",
        borderRadius: "8px",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <Button
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          color: "#54acac",
        }}
      >
        {!project?.name && <ConstructionRoundedIcon fontSize="large" />}
        {t(project?.name || "under_construction")}
      </Button>
    </Card>
  );
};
