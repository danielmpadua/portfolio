import { TAnimation } from "../../../hooks/useDaniAnimation";

type TDanielAnimation = {
  currentAnimation: TAnimation;
};

export const DanielAnimation = ({ currentAnimation }: TDanielAnimation) => {
  return <img src={currentAnimation?.gif} alt="Dani Animation" />;
};
