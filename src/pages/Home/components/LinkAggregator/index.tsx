import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { CustomLinkButton } from "../../../../components/CustomLinkButton";
import { CustomLinkIconButton } from "../../../../components/CustomLinkIconButton";
import { useTranslation } from "react-i18next";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

type TLinkAggregator = {
  onClickPortifolio: () => void;
};

export const LinkAggregator = ({ onClickPortifolio }: TLinkAggregator) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        maxWidth: 360,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <CustomLinkButton
          text={t("projects")}
          icon={<ArrowForwardRoundedIcon />}
          onClick={onClickPortifolio}
        />

        <CustomLinkButton
          text={t("my_item_male_one", { item: "GitHub" })}
          icon={<GitHubIcon />}
          link="https://github.com/danielmpadua"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CustomLinkIconButton
          icon={<LinkedInIcon />}
          link="https://www.linkedin.com/in/danielmpadua/"
        />

        <CustomLinkIconButton
          icon={<InstagramIcon />}
          link="https://www.instagram.com/danielmpadua/"
        />

        <CustomLinkIconButton
          icon={<FacebookIcon />}
          link="https://www.facebook.com/daniel.marianopadua"
        />
      </Box>

      <Typography
        fontFamily="Inter"
        fontWeight={400}
        fontSize={14}
        lineHeight="12px"
        color="#426274"
      >
        {t("made_with_love", { item: "GitHub" })}
      </Typography>
    </Box>
  );
};
