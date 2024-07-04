import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TAnimation } from "../hooks/useDaniAnimation";

type TBackgroundLoop = {
  currentAnimation: TAnimation;
  groundImg: string;
  bgImg: string;
  skyImg: string;
  bgColor: string;
  width: number;
};

const defaultImgHeight = 500;
const defaultImgWidth = 1920;
const skyWidth = 200;
const groundWidth = 600;
const groundSpeed = 200;
const groundDistance = 10;
const bgDistance = 5;

export const BackgroundLoop = ({
  currentAnimation,
  bgImg,
  bgColor,
  groundImg,
  skyImg,
  width,
}: TBackgroundLoop) => {
  const [groundsPosition, setGroundsPosition] = useState<number[]>(
    Array(Math.ceil(width / groundWidth) + 1)
      .fill(undefined)
      .map((_, index) => {
        return groundWidth * (index - 1);
      })
  );

  const [bgPosition, setBgPosition] = useState<number[]>(
    Array(Math.ceil(width / groundWidth) + 1)
      .fill(undefined)
      .map((_, index) => {
        return groundWidth * (index - 1);
      })
  );

  const endlessBackgroundAnimation = () => {
    setGroundsPosition((prev) =>
      prev?.map((position, index) => {
        if (index === prev?.length - 1 && position > width)
          return prev[0] - groundWidth + groundDistance;
        if (position > width)
          return prev[index + 1] - groundWidth + groundDistance;
        return position + groundDistance;
      })
    );

    setBgPosition((prev) =>
      prev?.map((position, index) => {
        if (index === prev?.length - 1 && position > width)
          return prev[0] - groundWidth + bgDistance;
        if (position > width) return prev[index + 1] - groundWidth + bgDistance;
        return position + bgDistance;
      })
    );
  };

  const bgColorHeight = () => {
    const proportion = groundWidth / defaultImgWidth;
    return defaultImgHeight * proportion;
  };

  useEffect(() => {
    if (currentAnimation?.name === "walk") {
      endlessBackgroundAnimation();
      const intervalId = setInterval(endlessBackgroundAnimation, groundSpeed);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAnimation?.name]);

  useEffect(() => {
    if (groundsPosition?.length !== Math.ceil(width / groundWidth) + 1) {
      const arr = Array(Math.ceil(width / groundWidth) + 1).fill(undefined);

      setGroundsPosition(
        arr?.map((_, index) => {
          return groundWidth * (index - 1);
        })
      );

      setBgPosition(
        arr?.map((_, index) => {
          return groundWidth * (index - 1);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        background: bgColor,
        height: bgColorHeight(),
        width: "100%",
      }}
    >
      <Box
        sx={{
          zIndex: 98,
          position: "absolute",
          left: `calc(50% - ${skyWidth / 2}px)`,
        }}
      >
        <img src={skyImg} alt="sky" style={{ width: skyWidth }} />
      </Box>

      {groundsPosition?.map((position, index) => (
        <Box
          key={index}
          sx={{ zIndex: 100, position: "absolute", left: position }}
        >
          <img src={groundImg} alt="ground" style={{ width: groundWidth }} />
        </Box>
      ))}

      {bgPosition?.map((position, index) => (
        <Box
          key={index}
          sx={{ zIndex: 99, position: "absolute", left: position }}
        >
          <img src={bgImg} alt="back ground" style={{ width: groundWidth }} />
        </Box>
      ))}
    </Box>
  );
};
