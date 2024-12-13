import SukiIdle from "../../../assets/gifs/sukiIdle.gif";
import SukiWalk from "../../../assets/gifs/sukiWalk.gif";
import { TAnimation } from "../../../hooks/useDaniAnimation";

type TSukiAnimation = {
  currentAnimation: TAnimation;
  scale?: number;
};

export const SukiAnimation = ({
  currentAnimation,
  scale = 1,
}: TSukiAnimation) => {
  return (
    <img
      width={32 * scale}
      src={currentAnimation?.name === "walk" ? SukiWalk : SukiIdle}
      alt="Suki Animation"
    />
  );
};
