import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BG_DISTANCE,
  GROUND_DISTANCE,
  GROUND_SPEED,
  GROUND_WIDTH,
  TAnimation,
  useDanielAnimation,
} from "../hooks/useDaniAnimation";

type TBackgroundLoop = {
  currentAnimation: TAnimation;
  groundImg: string;
  bgImg: string;
  width: number;
};

export const BackgroundLoop = ({
  currentAnimation,
  bgImg,
  groundImg,
  width,
}: TBackgroundLoop) => {
  const { animationHeight } = useDanielAnimation({ width });

  const [groundsPosition, setGroundsPosition] = useState<number[]>(
    Array(Math.ceil(width / GROUND_WIDTH) + 1)
      .fill(undefined)
      .map((_, index) => {
        return GROUND_WIDTH * (index - 1);
      })
  );

  const [bgPosition, setBgPosition] = useState<number[]>(
    Array(Math.ceil(width / GROUND_WIDTH) + 1)
      .fill(undefined)
      .map((_, index) => {
        return GROUND_WIDTH * (index - 1);
      })
  );

  const endlessBackgroundAnimation = () => {
    setGroundsPosition((prev) =>
      prev?.map((position, index) => {
        if (index === prev?.length - 1 && position > width)
          return prev[0] - GROUND_WIDTH + GROUND_DISTANCE;
        if (position > width)
          return prev[index + 1] - GROUND_WIDTH + GROUND_DISTANCE;
        return position + GROUND_DISTANCE;
      })
    );

    setBgPosition((prev) =>
      prev?.map((position, index) => {
        if (index === prev?.length - 1 && position > width)
          return prev[0] - GROUND_WIDTH + BG_DISTANCE;
        if (position > width)
          return prev[index + 1] - GROUND_WIDTH + BG_DISTANCE;
        return position + BG_DISTANCE;
      })
    );
  };

  useEffect(() => {
    if (currentAnimation?.name === "walk") {
      endlessBackgroundAnimation();
      const intervalId = setInterval(endlessBackgroundAnimation, GROUND_SPEED);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAnimation?.name]);

  useEffect(() => {
    if (groundsPosition?.length !== Math.ceil(width / GROUND_WIDTH) + 1) {
      const arr = Array(Math.ceil(width / GROUND_WIDTH) + 1).fill(undefined);

      setGroundsPosition(
        arr?.map((_, index) => {
          return GROUND_WIDTH * (index - 1);
        })
      );

      setBgPosition(
        arr?.map((_, index) => {
          return GROUND_WIDTH * (index - 1);
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
        height: animationHeight,
        width: "100%",
      }}
    >
      {groundsPosition?.map((position, index) => (
        <Box
          key={index}
          sx={{ zIndex: 100, position: "absolute", left: position }}
        >
          <img src={groundImg} alt="ground" style={{ width: GROUND_WIDTH }} />
        </Box>
      ))}

      {bgPosition?.map((position, index) => (
        <Box
          key={index}
          sx={{ zIndex: 99, position: "absolute", left: position }}
        >
          <img src={bgImg} alt="back ground" style={{ width: GROUND_WIDTH }} />
        </Box>
      ))}
    </Box>
  );
};
