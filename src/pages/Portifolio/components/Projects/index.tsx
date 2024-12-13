import { Box } from "@mui/material";
import { Carousel } from "primereact/carousel";
import { CustomLinkButton } from "../../../../components/CustomLinkButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useTranslation } from "react-i18next";
import { CarouselNavigation } from "../CarouselNavigation";
import { CarouselItem } from "../CarouselItem";

type TProjects = {
  onClickLinks: () => void;
};

export type TProject = {
  name?: string;
  image?: string;
  link?: string;
};

const PROJECTS: TProject[] = [{}, {}, {}, {}];

export const Projects = ({ onClickLinks }: TProjects) => {
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
          itemTemplate={CarouselItem}
          circular
          autoplayInterval={3000}
          prevIcon={<CarouselNavigation icon={<ArrowBackRoundedIcon />} />}
          nextIcon={<CarouselNavigation icon={<ArrowForwardRoundedIcon />} />}
        />
      </Box>
    </>
  );
};
