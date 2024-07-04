import { Box } from "@mui/material";
import { useScreenSize } from "../hooks/useScreenSize";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDanielAnimation } from "../hooks/useDaniAnimation";
import { DanielAnimation } from "./DanielAnimation";
import { SukiAnimation } from "./SukiAnimation";
import { BackgroundLoop } from "./BackgroundLoop";
import { useContext } from "react";

import DarkGround from "../assets/images/darkBgGround.png";
import DarkBg from "../assets/images/darkBg.png";
import LightGround from "../assets/images/lightBgGround.png";
import LightBg from "../assets/images/lightBg.png";
import DarkMoon from "../assets/images/darkMoon.png";
import LightSun from "../assets/images/lightSun.png";

export const AnimatedHeader = () => {
  const { width } = useScreenSize();
  const { isLightMode } = useContext(ThemeContext);
  const { currentAnimation } = useDanielAnimation({ width });

  return (
    <Box sx={{ position: "relative", mb: 21.5 }}>
      <Box sx={{ position: "absolute", zIndex: 100, top: 90, right: 50 }}>
        <DanielAnimation currentAnimation={currentAnimation} />
      </Box>

      <Box sx={{ position: "absolute", zIndex: 100, top: 125, right: 90 }}>
        <SukiAnimation currentAnimation={currentAnimation} />
      </Box>

      <Box sx={{ position: "absolute", zIndex: 99, width: "100%" }}>
        <BackgroundLoop
          currentAnimation={currentAnimation}
          bgColor={isLightMode ? "#79d4da" : "#426274"}
          bgImg={isLightMode ? LightBg : DarkBg}
          groundImg={isLightMode ? LightGround : DarkGround}
          skyImg={isLightMode ? LightSun : DarkMoon}
          width={width}
        />
      </Box>
    </Box>
  );
};
