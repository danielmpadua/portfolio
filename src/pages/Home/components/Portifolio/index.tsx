import { Box, Button, Card } from "@mui/material";
import { Carousel } from "primereact/carousel";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { CustomLinkButton } from "../../../../components/CustomLinkButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { CustomLinkIconButton } from "../../../../components/CustomLinkIconButton";
import { useTranslation } from "react-i18next";

type TPortifolio = {
  onClickLinks: () => void;
};

type TProject = {
  name?: string;
  image?: string;
  link?: string;
};

const PROJECTS: TProject[] = [{}, {}, {}, {}];

export const Portifolio = ({ onClickLinks }: TPortifolio) => {
  const { t } = useTranslation();

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (project: TProject) => {
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

  return (
    <>
      <Box
        sx={{
          maxWidth: 360,

          width: "100%",
        }}
      >
        <CustomLinkButton
          text={t("my_item_male_other", { item: "links" })}
          onClick={onClickLinks}
          icon={<ArrowBackRoundedIcon />}
        />
      </Box>

      <Box
        sx={{
          maxWidth: 720,
          width: "100%",
          padding: 1,
          borderRadius: "12px",
          border: "2px solid rgba(255, 255, 255, 0.7)",
          color: "whitesmoke",
          background: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Carousel
          value={PROJECTS}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          circular
          autoplayInterval={3000}
          prevIcon={
            <CustomLinkIconButton smoothHover icon={<ArrowBackRoundedIcon />} />
          }
          nextIcon={
            <CustomLinkIconButton
              smoothHover
              icon={<ArrowForwardRoundedIcon />}
            />
          }
        />
      </Box>
    </>
  );
};
