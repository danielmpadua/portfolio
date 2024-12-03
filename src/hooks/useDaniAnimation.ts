import { useEffect, useState } from "react";
import DaniIdle2 from "../assets/gifs/daniIdle2.gif";
import DaniWalk from "../assets/gifs/daniSideWalk.gif";
import DaniIdle from "../assets/gifs/daniIdle.gif";

export type TAnimation = {
  name: "idle" | "walk" | "idle2" | "fall";
  gif: string;
  time: number;
  numberRangeMax: number;
  numberRangeMin: number;
  currentChangeNumber?: number;
};

type TDanielAnimation = {
  width: number;
};

export const FUNCTION_DELAY = 10;
export const DEFAULT_IMG_HEIGHT = 500; // real size is 540px, but this way it looks better :)
export const DEFAULT_IMG_WIDTH = 1920;
export const GROUND_WIDTH = 600;

const AnimationOptions: TAnimation[] = [
  {
    name: "idle",
    gif: DaniIdle,
    time: 6000,
    numberRangeMin: 60,
    numberRangeMax: 99,
  },
  {
    name: "walk",
    gif: DaniWalk,
    time: 4800,
    numberRangeMin: 20,
    numberRangeMax: 59,
  },
  {
    name: "idle2",
    gif: DaniIdle2,
    time: 2600,
    numberRangeMin: 10,
    numberRangeMax: 19,
  },
];

export const useDanielAnimation = ({ width }: TDanielAnimation) => {
  const [currentAnimation, setCurrentAnimation] = useState<TAnimation>({
    ...AnimationOptions[0],
    currentChangeNumber: 1,
  });

  const getNewAnimation = () => {
    const number = Math?.floor(Math?.random() * 100);

    return AnimationOptions?.find(
      (animation) =>
        animation?.numberRangeMin <= number &&
        animation?.numberRangeMax >= number
    );
  };

  const animationHeight = () => {
    const proportion = GROUND_WIDTH / DEFAULT_IMG_WIDTH;
    return DEFAULT_IMG_HEIGHT * proportion;
  };

  useEffect(() => {
    setCurrentAnimation(AnimationOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    timeoutId = setTimeout(() => {
      const newAnimation: TAnimation = {
        ...(getNewAnimation() || AnimationOptions[0]),
        currentChangeNumber: (currentAnimation?.currentChangeNumber || 0) + 1,
      };

      setCurrentAnimation(newAnimation);
    }, currentAnimation?.time - FUNCTION_DELAY);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAnimation?.currentChangeNumber]);

  return {
    currentAnimation,
    AnimationOptions,
    setCurrentAnimation,
    animationHeight: animationHeight(),
  };
};
