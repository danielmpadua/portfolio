import { Box } from "@mui/material";
import { Carousel } from "primereact/carousel";
import { CustomLinkButton } from "../../../../components/CustomLinkButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useTranslation } from "react-i18next";
import { CarouselNavigation } from "../CarouselNavigation";
import { CarouselItem } from "../CarouselItem";
import Finance from "../../../../assets/images/finance.jpg";

type TProjects = {
  onClickLinks: () => void;
};

export type TProject = {
  name?: string;
  image?: string;
  tab?: string;
  news?: boolean;
};

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

const PROJECTS: TProject[] = [
  { name: "finance", tab: "/finance", image: Finance, news: true },
  {},
  {},
];

export const Projects = ({ onClickLinks }: TProjects) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ maxWidth: 360, width: "100%" }}>
        <CustomLinkButton
          text={t("my_item_male_other", { item: "links" })}
          onClick={onClickLinks}
          icon={<ArrowBackRoundedIcon />}
        />
      </Box>

      <Box
        sx={{
          maxWidth: 900,
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
          numScroll={1}
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
