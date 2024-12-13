import { TAnimation } from "../../../hooks/useDaniAnimation";

type TDanielAnimation = {
  currentAnimation: TAnimation;
  scale?: number;
};

export const DanielAnimation = ({
  currentAnimation,
  scale = 1,
}: TDanielAnimation) => {
  return (
    <img width={64 * scale} src={currentAnimation?.gif} alt="Dani Animation" />
  );
};
