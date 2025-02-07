import { Avatar, Box, Typography } from "@mui/material";
import { APP_BAR_HEIGHT } from "../../components/HeaderMenu";
import { FooterAnimation } from "../../components/FooterAnimation";
import { LinkAggregator } from "./components/LinkAggregator";
import { useState } from "react";

import { Projects } from "./components/Projects";
import { useSearchParams } from "react-router";

export const Portifolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentOption, setCurrentOption] = useState(
    searchParams.get("tab") === "projects" ? "projects" : "links"
  );

  const onChangeOption = (option: string) => {
    setCurrentOption(option);
    setSearchParams(`tab=${option}`);
  };

  return (
    <Box>
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
          gap: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{ width: 112, height: 112, border: "3px solid #fff" }}
            src="https://avatars.githubusercontent.com/u/43578469?v=4"
            alt="Daniel Padua"
          />

          <Typography
            fontFamily="Inter"
            fontWeight={500}
            lineHeight="24px"
            color="white"
          >
            @danielmpadua
          </Typography>
        </Box>

        {currentOption === "links" && (
          <LinkAggregator
            onClickPortifolio={() => onChangeOption("projects")}
          />
        )}

        {currentOption === "projects" && (
          <Projects onClickLinks={() => onChangeOption("links")} />
        )}
      </Box>

      <FooterAnimation />
    </Box>
  );
};
