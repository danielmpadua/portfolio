import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GROUND_WIDTH, useDanielAnimation } from "../../hooks/useDaniAnimation";
import { useScreenSize } from "../../hooks/useScreenSize";
import { ThemeContext } from "../../contexts/ThemeContext";

import { BackgroundScroll } from "./components/BackgroundScroll";

import DarkGround from "../../assets/images/darkBgGround.png";
import DarkBg from "../../assets/images/darkBg.png";
import LightGround from "../../assets/images/lightBgGround.png";
import LightBg from "../../assets/images/lightBg.png";
import { DanielAnimation } from "./components/DanielAnimation";
import { SukiAnimation } from "./components/SukiAnimation";
import { APP_BAR_HEIGHT } from "../HeaderMenu";

export const FooterAnimation = () => {
  const { isLightMode } = useContext(ThemeContext);
  const { width } = useScreenSize();
  const { currentAnimation } = useDanielAnimation({ width });

  const createPopulatedArray = (size: number) => {
    const newGrounds = Array(size).fill(0);
    return newGrounds;
  };

  const [backgrounds, setBackgrounds] = useState<number[]>(
    createPopulatedArray(Math.ceil(width / GROUND_WIDTH) * 2)
  );

  useEffect(() => {
    if (backgrounds?.length !== Math.ceil(width / GROUND_WIDTH) * 2) {
      const newBgs = createPopulatedArray(Math.ceil(width / GROUND_WIDTH) * 2);

      setBackgrounds(newBgs);
    }
  }, [backgrounds?.length, isLightMode, width]);

  return (
    <Box
      sx={{
        width: "100%",
        height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
        position: "absolute",
        top: APP_BAR_HEIGHT,
        zIndex: 0,
      }}
    >
      <Box sx={{ position: "absolute", zIndex: 3, bottom: 0, right: 50 }}>
        <DanielAnimation currentAnimation={currentAnimation} />
      </Box>

      <Box sx={{ position: "absolute", zIndex: 4, bottom: 0, right: 40 }}>
        <SukiAnimation currentAnimation={currentAnimation} />
      </Box>

      <BackgroundScroll
        elements={backgrounds}
        image={isLightMode ? LightBg : DarkBg}
        width={GROUND_WIDTH}
        speed={35}
        paused={currentAnimation?.name !== "walk"}
      />

      <BackgroundScroll
        elements={backgrounds}
        image={isLightMode ? LightGround : DarkGround}
        width={GROUND_WIDTH}
        speed={20}
        paused={currentAnimation?.name !== "walk"}
        zIndex={2}
      />
    </Box>
  );
};
