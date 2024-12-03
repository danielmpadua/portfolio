import SukiIdle from "../../../assets/gifs/sukiIdle.gif";
import SukiWalk from "../../../assets/gifs/sukiWalk.gif";
import { TAnimation } from "../../../hooks/useDaniAnimation";

type TSukiAnimation = {
  currentAnimation: TAnimation;
};

export const SukiAnimation = ({ currentAnimation }: TSukiAnimation) => {
  return (
    <img
      src={currentAnimation?.name === "walk" ? SukiWalk : SukiIdle}
      alt="Suki Animation"
    />
  );
};
