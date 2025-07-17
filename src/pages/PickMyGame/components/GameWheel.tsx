import { Box } from "@mui/material";
import { GameCard } from "./GameCard";
import { TSteamGames } from "../../../hooks/usePickMyGame";
import { DanielAnimation } from "../../../components/FooterAnimation/components/DanielAnimation";
import {
  ANIMATIONS,
  useDanielAnimation,
} from "../../../hooks/useDaniAnimation";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useEffect } from "react";

type TGameWheel = {
  gamesState: TSteamGames[];
  isSpinning: boolean;
  angleStep: number;
  selectedIndex: number | null;
  rotation: number;
  onTopIndex: number | null;
};

export const GameWheel = ({
  angleStep,
  gamesState,
  isSpinning,
  rotation,
  selectedIndex,
  onTopIndex,
}: TGameWheel) => {
  const radius = 260;
  const centerX = window.innerWidth / 2;
  const centerY = 400;

  const { width } = useScreenSize();
  const { currentAnimation, setCurrentAnimation, AnimationOptions } =
    useDanielAnimation({
      width,
      filterAnimations: [ANIMATIONS.IDLE],
      freezeAnimation: true,
    });

  useEffect(() => {
    if (isSpinning) setCurrentAnimation({ ...AnimationOptions[1], time: 2000 });
    else setCurrentAnimation({ ...AnimationOptions[2] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning]);

  useEffect(() => {
    if (gamesState) {
      setCurrentAnimation(AnimationOptions[3]);
      setTimeout(() => {
        setCurrentAnimation(AnimationOptions[0]);
      }, AnimationOptions[3]?.time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamesState]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: centerY - radius - 30,
          left: "calc(50% - 15px)",
          width: 30,
          height: 30,
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)", // triângulo apontando para baixo
          bgcolor: "primary.main",
          zIndex: 9999999,
        }}
      />

      {/* Círculo de imagens giratório */}
      <Box
        sx={{ position: "relative", width: "100vw", height: centerY + radius }}
      >
        <Box
          sx={{
            position: "absolute",
            top: centerY + radius - 64 - 65,
            left: "calc(50% - 32px)",
            zIndex: 1000,
            transform: "scaleX(-1)",
          }}
        >
          <DanielAnimation currentAnimation={currentAnimation} />
        </Box>

        {gamesState?.map((game, index) => (
          <GameCard
            game={game}
            isSpinning={isSpinning}
            angleStep={angleStep}
            centerX={centerX}
            centerY={centerY}
            index={index}
            isSelected={index === selectedIndex}
            radius={radius}
            rotation={rotation}
            isOnTop={index === onTopIndex}
            // isLast={index === gamesState?.length - 1}
            total={gamesState?.length}
          />
        ))}
      </Box>
    </>
  );
};
