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

export const AnimatedFooter = () => {
  const { width } = useScreenSize();
  const { isLightMode } = useContext(ThemeContext);
  const { currentAnimation, animationHeight } = useDanielAnimation({ width });

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        right: 0,
        bottom: animationHeight,
        zIndex: 0,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", zIndex: 100, top: 90, right: 50 }}>
          <DanielAnimation currentAnimation={currentAnimation} />
        </Box>

        <Box sx={{ position: "absolute", zIndex: 101, top: 121, right: 40 }}>
          <SukiAnimation currentAnimation={currentAnimation} />
        </Box>

        <Box sx={{ position: "absolute", zIndex: 99, width: "100%" }}>
          <BackgroundLoop
            currentAnimation={currentAnimation}
            bgImg={isLightMode ? LightBg : DarkBg}
            groundImg={isLightMode ? LightGround : DarkGround}
            width={width}
          />
        </Box>
      </Box>
    </Box>
  );
};
